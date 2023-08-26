const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./mysqlService');

const saltRounds = 10;

const ACCESS_TOKEN_SECRET = 'GWKYMDWI20';
const REFRESH_TOKEN_SECRET = '6EHYXRMLMM';

exports.isUserExist = (username) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT EXISTS(SELECT * from User WHERE user_name='${username}') as res;`;
        let query = db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0].res == 1);
            }
        });
    });
};

exports.hashPasswrd = (passwrd) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(passwrd, saltRounds, function(err, hash) {
            if (err) {
                reject(err);
            }
            resolve(hash);
        });
    });
};

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

function generateRefreshToken(user) {
    return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '6M' });
}

exports.generateToken = (uuid) => {
    return new Promise((resolve) => {
        resolve({
            accessToken: generateAccessToken({uuid : uuid}),
            refreshToken: generateRefreshToken({uuid : uuid})
        });
    });
};

exports.verifyPasswrd = (passwrd, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(passwrd, hash, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
};

exports.verifyRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, REFRESH_TOKEN_SECRET,  (err, user) => {
            if (err) {
                if (err instanceof jwt.TokenExpiredError) {
                    resolve({error: true, message: 'Token expired'});
                    return;
                }
                reject(err);
                return;
            }
            const sql = `SELECT EXISTS(SELECT * from User WHERE uuid='${user.uuid}') as res;`;
            let query = db.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (result[0].res == 0) {
                    resolve({error: true, message: 'Account has been removed'});
                    return;
                }
                resolve({error: false, accessToken: generateAccessToken({uuid : user.uuid})});
            });
        });
    });
};