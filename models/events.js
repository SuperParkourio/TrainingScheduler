'use strict';
module.exports = (sequelize, DataTypes) => {
  var Events = sequelize.define(
    'Events',
    {
      name:  {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          models.Events.belongsTo(models.Users, {
            foreignKey: 'userId',
            sourceKey: 'id',
          });
        },
      },
    },
  );
  return Events;
};
