import { DataTypes } from 'sequelize';
import sequelize from '../dbconfig.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    nome:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true,
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    position:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    imgLink:{
        type:DataTypes.STRING,
        allowNull:false,
    }
  });

export default User