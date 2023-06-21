"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Calendar, {
        foreignKey: "user_id"
      });
      User.hasMany(models.Setting, {
        foreignKey: "user_id"
      });
    }
  }
  User.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      profile_pic: DataTypes.BLOB
    },
    {
      sequelize,
      modelName: "User"
    }
  );
  return User;
};
