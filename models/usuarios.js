//  (clientes con credenciales de acceso)
// npx sequelize-cli migration:generate --name create-usuarios

module.exports = (sequelize, DataTypes) => {
    const Usuarios = sequelize.define('Usuarios', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rolId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Roles',
          key: 'id'
        }
      },
      clienteId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Clientes',
          key: 'id'
        }
      },
    // Agregar el nuevo campo para el Firebase User ID
    firebaseUserId: {
      type: DataTypes.STRING,
      allowNull: true, // Este campo puede ser opcional si no todos los usuarios se autentican con Firebase
    }
    }, {});
  
    // Definir asociaciones
    Usuarios.associate = (models) => {
        Usuarios.belongsTo(models.Roles, { foreignKey: 'rolId' });
        Usuarios.belongsTo(models.Clientes, { foreignKey: 'clienteId' });
    };
  
    return Usuarios;
  };
  