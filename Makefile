SHELL := /bin/bash

UID := $(shell id -u)
GID := $(shell id -g)
cmd = /bin/bash

export UID
export GID
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1


### Commands for local development

.PHONY: npm-install
npm-install:
	@npm i --no-save
	@npm --prefix database i --no-save

.PHONY: database-connect-dev
database-connect-dev: npm-install
	@docker-compose up -d --build database
	@npx wait-on -l -d 5000 tcp:localhost:5432

.PHONY: database-disconnect-dev
database-disconnect-dev:
	@docker-compose down database

.PHONY: migrate-up-dev
migrate-up-dev: database-connect-dev
	@cd database && . config/dev/values.env && npx sequelize-cli db:migrate --debug --env default

.PHONY: migrate-down-dev
migrate-down-dev: database-connect-dev
	@cd database && . config/dev/values.env && npx sequelize-cli db:migrate:undo --debug --env default

.PHONY: seed-up-dev
seed-up-dev: database-connect-dev
	@cd database && . config/dev/values.env && npx sequelize-cli db:seed:all --debug --env default

.PHONY: seed-down-dev
seed-down-dev: database-connect-dev
	@cd database && . config/dev/values.env && npx sequelize-cli db:seed:undo --debug --env default

.PHONY: up
up: npm-install migrate-up-dev seed-up-dev
	@docker-compose up -d --build

.PHONY: down
down:
	@docker-compose down

.PHONY: run
run:
	@docker-compose run --rm server $(cmd)

.PHONY: exec
exec:
	@docker-compose exec -T server $(cmd)

.PHONY: logs
logs:
	@docker-compose logs -f server
