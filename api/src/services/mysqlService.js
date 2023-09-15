const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const db = mysql.createConnection({

    host: "db",
  
    user: "root",
  
    password: "root",
  
    database: "masterdle",
  
});

const sql = 'INSERT INTO User SET ? ON DUPLICATE KEY UPDATE uuid = "admin";';
const user = {
    uuid: 'admin',
    user_name: 'admin',
    user_passwrd: bcrypt.hashSync('admin', 10),
    user_role: 'admin'
};
db.query(sql, user);

module.exports = db;