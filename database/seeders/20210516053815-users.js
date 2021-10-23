'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      INSERT INTO users (name, email, phone) VALUES
      ('George Bluth', 'george.bluth@bluthcompany.com', '555-555-5555'),
      ('Lucille Bluth', 'lucille.bluth@bluthcompany.com', '555-555-5556'),
      ('George Oscar Bluth', 'george.oscar.bluth@bluthcompany.com', '555-555-5557'),
      ('Michael Bluth', 'michael.bluth@bluthcompany.com', '555-555-5558'),
      ('Lindsay Bluth', 'lindsay.bluth@bluthcompany.com', '555-555-5559');
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM users;
    `);
  }
};
