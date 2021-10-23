import { Sequelize } from 'sequelize';

import { Config } from './config';

export type DatabaseClient = Sequelize;

export function createDatabaseClient(config: Config): DatabaseClient {
  return new Sequelize(config.database.database, config.database.user, config.database.password, {
    host: config.database.host,
    port: config.database.port,
    dialect: 'postgres',
  });
}
