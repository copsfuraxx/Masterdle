const db = require('./mysqlService');
const uuid = require('uuid');

exports.newUser = async (username, hash) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO User SET ?;';
        const user = {
            uuid: uuid.v4(),
            user_name: username,
            user_passwrd: hash
        };
        db.query(sql, user, (err) => {
            if (err) {
                reject(err);
            }
            resolve(user.uuid)
        });
    });
};

exports.findUser = async (username) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM User WHERE user_name = '${username}';`;
        db.query(sql, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res[0]);
        });
    });
};

exports.findUserWithid = async (uuid) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM User WHERE uuid = '${uuid}';`;
        db.query(sql, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res[0]);
        });
    });
};

exports.userRoleEquals = async (uuid, role) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT user_role FROM User WHERE uuid = "${uuid}";`
        db.query(sql, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
};