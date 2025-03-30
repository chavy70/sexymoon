//  (ej. Admin, Cliente, Vendedor).
// npx sequelize-cli migration:generate --name create-roles
module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define('Roles', {
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
  
    Roles.associate = (models) => {
      Roles.belongsToMany(models.Permisos, { through: 'RolesYpermisos', foreignKey: 'rolId' });
      Roles.hasMany(models.Usuarios, { foreignKey: 'rolId' });
    };
  
    return Roles;
  };
  