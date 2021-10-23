'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      INSERT INTO events (name, description, start_at, end_at) VALUES
      ('Event 1', 'Sample 1', '2005-03-06T12:00:00Z', '2005-03-06T14:30:00Z'),
      ('Event 2', 'Sample 2', '2006-04-08T05:00:00Z', '2006-04-08T07:30:00Z'),
      ('Event 3', 'Sample 3', '2007-09-29T20:00:00Z', '2007-09-29T22:45:00Z'),
      ('Event 4', 'Sample 4', '2007-11-11T06:00:00Z', '2007-11-11T07:30:00Z'),
      ('Event 5', 'Sample 5', '2008-05-01T13:15:00Z', '2008-05-01T18:00:00Z');
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      DELETE FROM events;
    `);
  }
};
