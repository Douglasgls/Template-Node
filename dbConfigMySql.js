import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
  }
);

sequelize.sync({ force: false })
  .then(() => {
    console.log("Todas as tabelas foram sincronizadas com MySQL.");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar com o banco de dados MySQL:", err);
  });

export default sequelize;
