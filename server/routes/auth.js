const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const config = require("../config");
const gateway = require("../helpers/gateway");
const webSocket = require("../helpers/webSocket");
const ethereum = require("../services/ethereum.service");
const drm = require("../services/drm.service");

const STATUS_EVENT = "status";

router.get('/', function (req, res) {

    let status = 0;
    let result = {};

    /*
       Request  to LOGIN SERVICE
    */
    gateway.get("http://localhost:3001/api/login").then((res) => {

        result = res;

        console.log('result from service', res);

        // UPDATE STATUS HERE  - EMIT EVENT  (WEB SOCKET) :  Request to LOGIN SERVICE
        status++;
        webSocket.emitEvent(STATUS_EVENT, {status: status});

        // CALL DRM
        return drm.requestKey("megogo", 123);
    }).then((res) => {

        console.log('result from service', res);

        // UPDATE STATE - EMIT  EVENT (WEB SOCKET)  STATE : Request to DRM // state++
        status++;
        webSocket.emitEvent(STATUS_EVENT, {status: status});

        // CALL TO ETHER - ADD VIEW // promise
        return ethereum.addView("megogo", 123, res);
    }).then((res) => {

        // UPDATE STATE - EMIT EVENT (Web socket ) : proof of giving key // state++
        status++;
        webSocket.emitEvent(STATUS_EVENT, {status: status, data: res});

        // request to CDN
        // SEND - OK
        status++;
        webSocket.emitEvent(STATUS_EVENT, {status: status});

    });
    res.JSON(result);
});

module.exports = router;