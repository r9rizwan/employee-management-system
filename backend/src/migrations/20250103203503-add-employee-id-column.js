'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add the 'employeeId' column to the 'employees' table.
     */
    await queryInterface.addColumn('employees', 'employeeId', {
      type: Sequelize.STRING(6),
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Revert the changes by removing the 'employeeId' column from the 'employees' table.
     */
    await queryInterface.removeColumn('employees', 'employeeId');
  }
};
