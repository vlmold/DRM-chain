const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const config = require("../config");
const path = require('path');
var ethService = require('../services/ethereum.service.js');


router.get('/', function (req, res) {
   console.log('called');

   //
    ethService.deploy().then((res)=>{
        console.log(res);
    })
});

module.exports = router;