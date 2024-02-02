const dotenv = require("dotenv");
dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const knexfile = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};

module.exports = knexfile;