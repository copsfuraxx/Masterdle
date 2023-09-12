const db = require('./mysqlService');

exports.newRandomSoluce = async () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM DataGame1 ORDER BY RAND() LIMIT 1;';
        db.query(sql, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res[0]);
        });
    });
};