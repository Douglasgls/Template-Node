// dbconfig.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_HOST_RENDER_POSTGRESS, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,      
      rejectUnauthorized: false,
    },
  },
});

sequelize.sync({ force: false })
  .then(() => {
    console.log("Conectado ao PostgreSQL do Render com sucesso!");
  })
  .catch((err) => {
    console.error("Erro na conexão com o PostgreSQL do Render:", err);
  });

export default sequelize;
