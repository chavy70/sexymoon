module.exports = (sequelize, DataTypes) => {
    const Clientes = sequelize.define('Clientes', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      }
    }, {});
  
    return Clientes;
  };
  