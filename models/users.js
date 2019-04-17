'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define(
    'Users',
    {
      first: DataTypes.STRING,
      last: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: { isEmail: { msg: 'Email is invalid' } },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: { args: [7, 20], msg: 'Phone number invalid.' },
          isNumeric: { msg: 'Not a valid phone number.' },
        },
      },
      userRoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      aboutMe: DataTypes.STRING,
      password: DataTypes.STRING,
      isTrainer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          models.Users.belongsTo(models.UserRoles, {
            foreignKey: 'userRoleId',
            sourceKey: 'id',
          });
        },
      },
    },
  );
  Users.beforeSave(async (user) => {
    let err;
    if (user.changed('password')) {
      let salt, hash;
      [err, salt] = await to(bcrypt.genSalt(10));
      if (err) TE(err.message, true);

      [err, hash] = await to(bcrypt.hash(user.password, salt));
      if (err) TE(err.message, true);

      user.password = hash;
    }
  });

  Users.prototype.comparePassword = async function(pw) {
    let err, pass;
    if (!this.password) TE('password not set');

    [err, pass] = await to(bcrypt_p.compare(pw, this.password));
    if (err) TE(err);

    if (!pass) TE('invalid password');

    return this;
  };

  Users.prototype.getJWT = function() {
    let expiration_time = parseInt(CONFIG.jwt_expiration);
    return (
      'Bearer ' +
      jwt.sign({ user_id: this.id }, CONFIG.jwt_encryption, {
        expiresIn: expiration_time,
      })
    );
  };
  return Users;
};
