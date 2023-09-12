const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
var cron = require('node-cron');

const logger = require('./logger');
const game1Service = require('./services/game1Service.js');

const config = {
    name: 'masterdle-api',
    port: 3000,
    host: 'localhost'
};

const app = express();

async function setSoluceGame1() {
    app.set('game1Soluce', await game1Service.newRandomSoluce());
    console.log(app.get('game1Soluce'));
}

setSoluceGame1();

cron.schedule('0 0 * * *', async () => {
    setSoluceGame1();
});

app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

app.use((req, _res, next) => {
    logger.info(`${new Date().toISOString()} : ${req.method} ${req.originalUrl}`);
    next();
});

app.use(bodyParser.json());

app.use('/auth', authRoutes); // Mount authentication routes

app.use((_req, res) => {
    res.status(404).json('Page not found');
});

app.listen(config.port, config.host, (e) => {
    if (e) {
        throw new Error('Internal Server Error');
    }
    logger.info(`${config.name} running on ${config.host}:${config.port}`);
});