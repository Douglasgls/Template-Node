import { DataTypes } from 'sequelize';
// import sequelize from '../dbConfigSqlite.js';
// import sequelize from '../dbConfigMySql.js';
import sequelize from '../dbConfigPostgres.js';

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    imgLink: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
      }
});

export default Product