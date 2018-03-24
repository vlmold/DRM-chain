'use strict';
const logger = require('./helpers/logger');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const config = require('./config');
const app = express();
const cors = require('cors');

const webSocket = require('./helpers/webSocket');
var web3Service = require('./services/web3.service.js');


app.options('*', cors({maxAge: 600}));
app.use(cors({maxAge: 600}));

app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(errorHandler);

// routes
app.use('/api/storage', require('./routes/storage'));
app.use('/api/distributor', require('./routes/distributor'));
app.use('/api/auth', require('./routes/auth'));


/* START SERVER CODE */
const host = config.host;
const port = config.port;
const server = http.createServer(app).listen(port, function () {
});
logger.info('****************** SERVER STARTED ************************');
logger.info('**************  http://' + host + ':' + port +
    '  ******************');
server.timeout = config.timeout;

function errorHandler(err, req, res, next) {
    if (err instanceof URIError && err.code === 403) {
        res.status(403).send({ Error: 'Access denied' })
    } else {
        res.status(500).send({ Error: err })
    }
}

// web3Service.setup();