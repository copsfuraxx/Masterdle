const db = require('./mysqlService');

exports.newRandomSoluce = async () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM DataGame1 ORDER BY RAND() LIMIT 1;';
        db.query(sql, (err, res) => {
            if (err) {
                reject(err);
            }
            if (res == null ||res == undefined) {
                resolve(null);
                return;
            }
            resolve(res[0]);
        });
    });
};

exports.getData = async (id) => {
    return new Promise((resolve, reject) => {
        const sql = `Select * FROM DataGame1 WHERE id = ${id};`;
        db.query(sql, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res[0]);
        });
    });
};

exports.getAllData = async () => {
    return new Promise((resolve, reject) => {
        const sql = `Select * FROM DataGame1;`;
        db.query(sql, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
}