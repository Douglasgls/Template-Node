import { DataTypes } from 'sequelize';
import sequelize from '../dbconfig.js';    


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