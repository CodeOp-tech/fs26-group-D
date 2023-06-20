"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn("Settings", "type", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("Settings", "value", {
      type: Sequelize.STRING
    });
    await queryInterface.removeColumn("Settings", "diet");
    await queryInterface.removeColumn("Settings", "allergies");
    await queryInterface.removeColumn("Settings", "bad_food");
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Settings", "type");
    await queryInterface.removeColumn("Settings", "value");

    await queryInterface.addColumn("Settings", "diet", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("Settings", "allergies", {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn("Settings", "bad_food", {
      type: Sequelize.STRING
    });
  }
};
