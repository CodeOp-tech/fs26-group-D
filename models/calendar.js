"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Calendar extends Model {
    static associate(models) {
      Calendar.belongsTo(models.User, {
        foreignKey: "user_id"
      });
    }
  }
  Calendar.init(
    {
      date: DataTypes.DATEONLY,
      meal_type: DataTypes.STRING,
      recipe_id: DataTypes.INTEGER,
      recipe_title: DataTypes.STRING,
      recipe_image: DataTypes.STRING,
      favourite: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "Calendar"
    }
  );
  return Calendar;
};
