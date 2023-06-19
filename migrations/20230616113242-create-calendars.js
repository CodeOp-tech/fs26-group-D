"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Calendars", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      meal_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      recipe_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      recipe_title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      recipe_image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      favourite: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Calendars");
  }
};
