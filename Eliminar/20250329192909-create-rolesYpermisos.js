'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RolesYpermisos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      rolId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',
          key: 'id'
        },
        allowNull: false
      },
      permisoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Permisos',
          key: 'id'
        },
        allowNull: false
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RolesYpermisos');
  }
};
