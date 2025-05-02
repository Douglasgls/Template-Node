import { DataTypes } from 'sequelize';
import sequelize from '../dbconfig.js';


const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    cartId: {
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

export default CartItem