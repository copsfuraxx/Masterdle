const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const logger = require('./logger');

const config = {
    name: 'masterdle-api',
    port: 3000,
    host: '0.0.0.0'
};

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    logger.info(`${new Date().toISOString()} : ${req.method} ${req.originalUrl}`);
    next();
});

app.use('/auth', authRoutes); // Mount authentication routes

app.use((req, res) => {
    res.status(404).json('Page not found');
});

app.listen(config.port, config.host, (e) => {
    if (e) {
        throw new Error('Internal Server Error');
    }
    logger.info(`${config.name} running on ${config.host}:${config.port}`);
});