const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const config = require("../config");
const path = require('path');
var loginService = require('../services/login.service.js');


router.get('/', function (req, res) {
   console.log('==============login service called==================');
    loginService.getCertificate().then((result)=>{
        console.log(result);
        res.send(result);
    })
});

module.exports = router;