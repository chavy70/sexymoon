//  (ej. "Crear Producto", "Eliminar Usuario")
// npx sequelize-cli migration:generate --name create-permisos
module.exports = (sequelize, DataTypes) => {
    const Permisos = sequelize.define('Permisos', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    }, {});
  
    Permisos.associate = (models) => {
        Permisos.belongsToMany(models.Roles, { through: 'RolesYpermisos', foreignKey: 'permisoId' });
    };
  
    return Permisos;
  };
  