import { DataTypes } from 'sequelize';
// import sequelize from '../dbConfigSqlite.js';
import sequelize from '../dbConfigMySql.js';
// import sequelize from '../dbConfigPostgres.js';


const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        dialectTypes: 'enum("pendente", "pago", "cancelada")',
      },
    total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      }
});

export default Order