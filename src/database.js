const mysql = require("mysql2/promise");
const configDB = require("./config");

const connect = async() => {
    return await mysql.createConnection(configDB);
}

module.exports = connect;