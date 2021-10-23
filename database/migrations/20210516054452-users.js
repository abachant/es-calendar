'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS users (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT,
        created_at timestamptz NOT NULL DEFAULT now()
      );
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS users;
    `);
  }
};
