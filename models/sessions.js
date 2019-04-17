'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define('Sessions', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: DataTypes.STRING,
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: DataTypes.DATE,
    description: DataTypes.STRING,
    trainerId: DataTypes.INTEGER,
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Sessions.associate = function(models) {
    models.Sessions.belongsTo(models.Users, {
      foreignKey: 'trainerId',
      sourceKey: 'id',
    });
    models.Sessions.belongsTo(models.Events, {
      foreignKey: 'eventId',
      sourceKey: 'id',
    });
  };
  return Sessions;
};
