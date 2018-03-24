const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const config = require("../config");
const gateway = require("../helpers/gateway.js")

router.get('/', function (req, res) {

    /*
       Request  to LOGIN SERVICE
    */
    gateway.get("http://localhost:3001/api/login").then((result) => {

        console.log('result from service', result);

        // UPDATE STATUS HERE  - EMIT EVENT  (WEB SOCKET) :  Request to LOGIN SERVICE 

        // CALL DRM 

        // UPDATE STATE - EMIT  EVENT (WEB SOCKET)  STATE : Request to DRM


        // CALL TO ETHER - ADD VIEW 

        // UPDATE STATE - EMIT EVENT (Web socket ) : proof of giving key
        

        // request to CDN 

        // SEND - OK 

        res.send(result);
    })
});

module.exports = router;