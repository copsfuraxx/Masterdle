const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var cron = require('node-cron');

const logger = require('./logger');
const authRoutes = require('./routes/authRoutes');
const game1Routes = require('./routes/game1Routes');
const userRoutes = require('./routes/userRoutes');
const game1Service = require('./services/game1Service');

const config = {
    name: 'masterdle-api',
    port: 3000,
    host: '0.0.0.0'
};

const app = express();

async function setSoluceGame1() {
    app.set('game1Soluce', await game1Service.newRandomSoluce());
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

app.use('/auth', authRoutes);
app.use('/game1', game1Routes);
app.use('/user', userRoutes);

app.use((_req, res) => {
    res.status(404).json('Page not found');
});

app.listen(config.port, config.host, (e) => {
    if (e) {
        throw new Error('Internal Server Error');
    }
    logger.info(`${config.name} running on ${config.host}:${config.port}`);
});