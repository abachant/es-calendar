ARG MODE=local
ARG ENVIRONMENT=dev


FROM node:14.16-buster-slim as base

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

ENV WORKDIR=/usr/src/app
WORKDIR ${WORKDIR}

RUN apt-get update && apt-get install -y \
  curl \
  openssl

ENV TINI_VERSION=0.19.0
RUN curl -SsL https://github.com/krallin/tini/releases/download/v${TINI_VERSION}/tini -o /usr/local/bin/tini \
  && chmod +x /usr/local/bin/tini

ENV USER=node
ENV GROUP=node
ENV NODE_ENV=development
ENV NO_UPDATE_NOTIFIER=true


FROM base as local

RUN apt-get install -y \
  git \
  python \
  g++ \
  make \
  bash \
  procps \
  && npm install -g concurrently

ENV FIXUID_VERSION=0.5
RUN curl -SsL https://github.com/boxboat/fixuid/releases/download/v${FIXUID_VERSION}/fixuid-${FIXUID_VERSION}-linux-amd64.tar.gz | tar -C /usr/local/bin -xzf - && \
  chown root:root /usr/local/bin/fixuid && \
  chmod 4755 /usr/local/bin/fixuid && \
  mkdir -p /etc/fixuid && \
  printf "user: ${USER}\ngroup: ${GROUP}\n" > /etc/fixuid/config.yml


FROM local as install-backend

COPY ./backend/package.json ./backend/package-lock.json ./backend/tsconfig.json ./backend/.eslintrc ./backend/.prettierrc ./
RUN npm ci

COPY ./backend/src ./src


FROM install-backend as build-backend

ARG ENVIRONMENT
COPY ./backend/config/${ENVIRONMENT} ./config/${ENVIRONMENT}


FROM local as install-frontend

COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm ci

COPY ./frontend .


FROM install-frontend as build-frontend

ARG ENVIRONMENT
RUN ENVIROMENT=${ENVIRONMENT} npm run build


FROM base as ci

RUN rm -rf /var/lib/apt/lists/*

COPY --from=build-backend --chown=${USER}:${GROUP} /usr/src/app ./backend
COPY --from=build-frontend --chown=${USER}:${GROUP} /usr/src/app/dist ./frontend/dist


FROM ci as live

ENV NODE_ENV=production

RUN npm --prefix backend prune


FROM ${MODE} as final

USER ${USER}:${GROUP}

ARG MODE
ENV MODE=${MODE}

ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}

CMD ["npm", "--prefix", "backend", "start"]
