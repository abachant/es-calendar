import { Config, createConfig } from './config';
import { Logger, createLogger } from './logger';
import { DatabaseClient, createDatabaseClient } from './database-client';
import { Models, createModels } from './models';

export interface Context {
  config: Config;
  logger: Logger;
  databaseClient: DatabaseClient;
  models: Models;
}

export function createContext(): Context {
  const config = createConfig();
  const logger = createLogger(config);
  const databaseClient = createDatabaseClient(config);
  const models = createModels(databaseClient);

  return {
    config,
    logger,
    databaseClient,
    models,
  };
}
