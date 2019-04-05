'use strict';
module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define('Events', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    location: DataTypes.STRING,
  }, {});
  Events.associate = function(models) {
    // associations can be defined here
    models.Events.belongsTo(models.UserRoles, {
      foreignKey: 'userId',
      sourceKey: 'id',
    });
  };
  return Events;
};