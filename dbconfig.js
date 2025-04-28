import { Sequelize } from 'sequelize';
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
  })

sequelize.sync({ force: false }) // force: true apaga e recria as tabelas
    .then(() => {
        console.log("Todas as tabelas foram sincronizadas.");
    })
    .catch((err) => {
        console.error("Erro ao sincronizar o banco de dados:", err);
    });

export default sequelize