import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
  })

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
    }
  });

sequelize.sync({ force: false }) // force: true apaga e recria as tabelas
    .then(() => {
        console.log("Banco de dados sincronizado.");
    })
    .catch((err) => {
        console.error("Erro ao sincronizar o banco de dados:", err);
    });

export default User