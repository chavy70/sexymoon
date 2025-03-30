
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Usuarios', 'firebaseUserId', {
      type: Sequelize.STRING,
      allowNull: true, // Esto es opcional, dependiendo de si quieres que sea obligatorio
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Usuarios', 'firebaseUserId');
  }
};