'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS events (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        description TEXT,
        start_at timestamptz NOT NULL,
        end_at timestamptz NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now()
      );
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS events;
    `);
  }
};
