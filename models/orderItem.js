import { DataTypes } from 'sequelize';
// import sequelize from '../dbConfigSqlite.js';
import sequelize from '../dbConfigMySql.js';
// import sequelize from '../dbConfigPostgres.js';


const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    unitPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      }
});

export default OrderItem