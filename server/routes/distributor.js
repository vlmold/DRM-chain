const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const config = require("../config");


router.get('/', function (req, res) {
   console.log('called');
    ethService.deploy().then((res)=>{
        console.log(res);
    })
});

module.exports = router;