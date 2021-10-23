import { ENVIRONMENT_PRD, ENVIRONMENT_STG, ENVIRONMENT_DEV } from './constants';

export type Environment = typeof ENVIRONMENT_PRD | typeof ENVIRONMENT_STG | typeof ENVIRONMENT_DEV;
