import { Sequelize } from 'sequelize';

import { createUserModel, User } from './user';

export interface Models {
  User: typeof User;
}

export function createModels(databaseClient: Sequelize): Models {
  return {
    User: createUserModel(databaseClient),
  };
}
