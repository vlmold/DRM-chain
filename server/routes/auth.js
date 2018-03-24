const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const config = require("../config");
const gateway = require("../helpers/gateway");
const webSocket = require("../helpers/webSocket");
const ethereum = require("../services/ethereum.service");

const STATUS_EVENT = "status";

router.get('/', function (req, res) {

    /*
       Request  to LOGIN SERVICE
    */
    gateway.get("http://localhost:3001/api/login").then((result) => {

        console.log('result from service', result);

        let status = 0;
        let res;

        // UPDATE STATUS HERE  - EMIT EVENT  (WEB SOCKET) :  Request to LOGIN SERVICE
        status++;
        webSocket.emitEvent(STATUS_EVENT, {status: status});

        // CALL DRM // заглушка

        // UPDATE STATE - EMIT  EVENT (WEB SOCKET)  STATE : Request to DRM // state++

        status++;
        webSocket.emitEvent(STATUS_EVENT, {status: status});

        // CALL TO ETHER - ADD VIEW // promise
        res = ethereum.addView("megogo", 123);

        // UPDATE STATE - EMIT EVENT (Web socket ) : proof of giving key // state++

        status++;
        webSocket.emitEvent(STATUS_EVENT, {status: status, data: res});

        // request to CDN 

        // SEND - OK 
        status++;
        webSocket.emitEvent(STATUS_EVENT, {status: status});

        res.send(result);
    })
});

module.exports = router;