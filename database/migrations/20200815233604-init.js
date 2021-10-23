"use strict";

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      REVOKE CREATE ON SCHEMA public FROM PUBLIC;


      -- Create read only user

      CREATE ROLE ro
      NOSUPERUSER NOBYPASSRLS INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;

      GRANT USAGE ON SCHEMA public TO ro;
      GRANT SELECT ON ALL TABLES IN SCHEMA public TO ro;
      GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO ro;
      GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO ro;

      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO ro;
      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON SEQUENCES TO ro;
      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO ro;

      -- Password to be changed manually on stg and prd.
      CREATE USER ro_user WITH PASSWORD 'postgres'
      NOSUPERUSER NOBYPASSRLS INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;

      GRANT ro TO ro_user;


      -- Create read/write user

      CREATE ROLE rw
      NOSUPERUSER NOBYPASSRLS INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;

      GRANT USAGE ON SCHEMA public TO rw;
      GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO rw;
      GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO rw;
      GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO rw;

      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO rw;
      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE ON SEQUENCES TO rw;
      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO rw;

      -- Password to be changed manually on stg and prd.
      CREATE USER rw_user WITH PASSWORD 'postgres'
      NOSUPERUSER NOBYPASSRLS INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;

      GRANT rw TO rw_user;
    `);
  },

  down: async (_queryInterface, _Sequelize) => {
  },
};
