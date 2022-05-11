require("dotenv").config();

const configDB = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    socketPath: "/var/run/mysqld/mysqld.sock"
}

module.exports = configDB;