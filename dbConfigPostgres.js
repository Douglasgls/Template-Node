// dbconfig.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgresql://root:I6B4uTDO1LNS9yQuRqSTswH2znL3pDl9@dpg-d0akpmh5pdvs73bquo0g-a.oregon-postgres.render.com/ecomerce_ap0k', {
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
