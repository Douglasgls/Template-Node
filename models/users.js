import { DataTypes } from 'sequelize';
// import sequelize from '../dbConfigSqlite.js';
import sequelize from '../dbConfigMySql.js';
// import sequelize from '../dbConfigPostgres.js';

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
        dialectTypes: 'enum("ADMIN", "USER")',
    },
    imgLink:{
        type:DataTypes.STRING,
        allowNull:false,
    },CPF:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            len:[11]
        }
    }
  });

export default User