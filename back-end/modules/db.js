const knex = require("knex");

module.exports = {
  db: knex({
    client: "pg",
    connection: {
      host: "127.0.0.1",
      port: "5432",
      user: "postgres",
      password: "27041994",
      database: "Food_Manager",
    },
  }),
};
