import env from 'env-var';

import { ENVIRONMENT_PRD, ENVIRONMENT_STG, ENVIRONMENT_DEV } from './constants';
import { Environment } from './types';

export interface Config {
  workDir: string;
  baseUrl: string;
  port: number;
  environment: Environment;
  isDev: boolean;
  isPrd: boolean;
  database: {
    user: string;
    password: string;
    database: string;
    port: number;
    host: string;
  };
}

export function createConfig(): Config {
  const environment = env.get('ENVIRONMENT').required().asEnum([ENVIRONMENT_PRD, ENVIRONMENT_STG, ENVIRONMENT_DEV]);

  return {
    workDir: env.get('WORKDIR').required().asString(),
    baseUrl: env.get('BASE_URL').required().asString(),
    port: env.get('PORT').required().asPortNumber(),
    environment,
    isDev: environment === ENVIRONMENT_DEV,
    isPrd: environment === ENVIRONMENT_PRD,
    database: {
      user: env.get('POSTGRES_USER').required().asString(),
      password: env.get('POSTGRES_PASSWORD').required().asString(),
      database: env.get('POSTGRES_DB').required().asString(),
      host: env.get('POSTGRES_HOST').required().asString(),
      port: env.get('POSTGRES_PORT').required().asPortNumber(),
    },
  };
}
