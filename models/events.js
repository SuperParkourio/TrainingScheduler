'use strict';
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define('events', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {});
  events.associate = function(models) {
    // associations can be defined here
  };
  return events;
};