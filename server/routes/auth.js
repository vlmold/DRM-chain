const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const config = require("../config");
const gateway = require("../helpers/gateway.js")

router.get('/', function (req, res) {

    gateway.get("http://localhost:3001/api/login").then((result) => {
        console.log('result from service', result);
        res.send(result);
    })
});

module.exports = router;