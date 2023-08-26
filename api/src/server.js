const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require("mysql2");
const uuid = require("uuid");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const winston = require('winston')

const config = {
    name: 'masterdle-api',
    port: 3000,
    host: '0.0.0.0'
};

const db = mysql.createConnection({

    host: "localhost",
  
    user: "root",
  
    password: "root",
  
    database: "masterdle",
  
});

const saltRounds = 10;

const ACCESS_TOKEN_SECRET = 'GWKYMDWI20';
const REFRESH_TOKEN_SECRET = '6EHYXRMLMM';

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
        return res.sendStatus(401)
        }
        req.uuid = user.uuid;
        next();
    });
}

function generateRefreshToken(user) {
    return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '1y' });
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'error.log', level: 'error'})
    ]
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    logger.info("MySql Connected");
    });

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.get('/', (req, res) => {
    logger.info(`GET ${req.originalUrl} from ${req.ip}`)
    res.status(200).json({message: 'hello world'});
});

server.post('/api/refreshToken', (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(401)
      }

      const refreshedToken = generateAccessToken(user);
      res.send({
        accessToken: refreshedToken,
      });
    });
  });

function hashPasswrd(req, res){
    bcrypt.hash(req.body.passwrd, saltRounds, function(err, hash) {
        if (err) {
            logger.error(err.message);
            res.status(500).json({message: err.message});
            return
        }
        logger.info(hash)
        let sql = 'INSERT INTO User SET ?;';
        let user = {
            uuid: uuid.v4(),
            user_name: req.body.username,
            user_passwrd: hash
        };
        logger.info(user.uuid)
        let query = db.query(sql, user, (err) => {
            if (err) {
                logger.error(err.message);
                res.status(500).json({message: err.message});
                return;
            }
            res.status(200).send({
                accessToken: generateAccessToken({uuid : user.uuid}),
                refreshToken: generateRefreshToken({uuid : user.uuid})
            });
        });
    });
}

function signup(req, res) {
    let sql = `SELECT EXISTS(SELECT * from User WHERE user_name='${req.body.username}') as res;`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            logger.error(err.message);
            res.status(500).json({message: err.message});
            return;
        }
        if (result[0].res == 1) {
            let msg = `User ${req.body.username} already exist`;
            logger.info(msg);
            res.status(400).json({message: msg});
            return;
        }
        hashPasswrd(req, res);
    });
}

function userExist(username){
    let result = true;
    let sql = `SELECT EXISTS(SELECT * from User WHERE user_name='${username}') as res;`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            logger.error(err.message);
            res.status(500).json({message: err.message});
            return;
        }
        if (result[0].res == 1) {
            let msg = `User ${req.body.username} already exist`;
            logger.info(msg);
            res.status(400).json({message: msg});
            return;
        }
        hashPasswrd(req, res);
    });
}

server.post('/signup', (req, res) => {
    logger.info(`GET ${req.originalUrl} from ${req.ip}`)
    signup(req, res);
});

function login(req, res) {
    let sql = `SELECT * from User WHERE user_name='${req.body.username}';`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            logger.error(err.message);
            res.status(500).json({message: err.message});
            return;
        }
        if (result[0] == null) {
            let msg = `User ${req.body.username} not exist`;
            logger.info(msg);
            res.status(400).json({message: msg});
            return;
        }
        bcrypt.compare(req.body.passwrd,result[0].user_passwrd, (err, passResult) => {
            if (err) {
                logger.error(err.message);
                res.status(500).json({message: err.message});
                return;
            }
            if (!passResult) {
                let message = 'bad password'
                logger.error(message);
                res.status(500).json({message: message});
                return;
            }
            res.status(200).send({
                accessToken: generateAccessToken({uuid : result[0].uuid}),
                refreshToken: generateRefreshToken({uuid : result[0].uuid})
            });
        });
    });
}

server.post('/login', (req, res) => {
    logger.info(`GET ${req.originalUrl} from ${req.ip}`)
    login(req, res);    
});

server.listen(config.port, config.host, (e) => {
    if (e) {
        throw new Error('Internal Server Error');
    }
    logger.info(`${config.name} running on ${config.host}:${config.port}`)
});
