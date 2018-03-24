const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const config = require("../config");
const path = require('path');

router.get('/', function (req, res) {
   console.log('called');
   
});

module.exports = router;