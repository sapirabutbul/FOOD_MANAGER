const knex = require("knex");

module.exports = {
  db: knex({
    client: "pg",
    connection: {
      host: "ec2-34-228-100-83.compute-1.amazonaws.com",
      port: "5432",
      user: "jknedsctncvmqt",
      password:
        "61e4b3aa4d68b9c10a00855472c0908025b47eccdb78d1a18c032ac557f79579",
      database: "db1qp6sofajpdh",
      ssl: { rejectUnauthorized: false },
    },
  }),
};
