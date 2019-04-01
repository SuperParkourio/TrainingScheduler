'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRoles = sequelize.define('UserRoles', {
    roleName: DataTypes.STRING
  }, {});
  UserRoles.associate = function(models) {
    // associations can be defined here
  };
  return UserRoles;
};