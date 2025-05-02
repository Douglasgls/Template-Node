import { DataTypes } from 'sequelize';
// import sequelize from '../dbConfigSqlite.js';
// import sequelize from '../dbConfigMySql.js';
import sequelize from '../dbConfigPostgres.js';

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
});

export default Cart