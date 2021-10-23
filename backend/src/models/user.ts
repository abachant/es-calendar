import { Model, DataTypes, Sequelize } from 'sequelize';

export class User extends Model {
  public id!: string;

  public name!: string;

  public email!: string;

  public phone!: string | null;

  public createdAt!: Date;
}

export function createUserModel(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      phone: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      underscored: true,
      updatedAt: false,
      tableName: 'users',
      sequelize,
    }
  );

  return User;
}
