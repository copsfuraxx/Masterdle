const mysql = require('mysql2');

const db = mysql.createConnection({

    host: "localhost",
  
    user: "root",
  
    password: "root",
  
    database: "masterdle",
  
});

module.exports = db;