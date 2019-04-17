'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Sessions', 'eventId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Events',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Sessions', 'eventId');
  }
};
