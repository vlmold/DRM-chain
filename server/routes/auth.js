const express = require('express');
const router = express.Router();
const logger = require('../helpers/logger');
const config = require("../config");
const gateway = require("../helpers/gateway");
const webSocket = require("../helpers/webSocket");
const ethereum = require("../services/ethereum.service");
const drm = require("../services/drm.service");
const login = require("../services/login.service");

const STATUS_EVENT = "status";

router.post('/', function (req, res) {

    console.log("/api/auth");

    let status = 0;
    let result = {};

    /*
       Request  to LOGIN SERVICE
       
    */
    console.log('===================================');
    console.log('REQUEST TO LOGIN SERVICE');
    login.getCertificate().then((res) => {

        result = res;
        console.log('===================================');
        console.log('RESULT FROM LOGIN SERVICE', res);
        console.log('===================================');


        // UPDATE STATUS HERE  - EMIT EVENT  (WEB SOCKET) :  Request to LOGIN SERVICE
        status++;
        webSocket.emitEvent(STATUS_EVENT, { status: status });

        // CALL DRM
        console.log('RESULT KEY FROM DRM KEY', res);
        console.log('===================================');

        return drm.requestKey("megogo", 123);
    }).then((res) => {

        console.log('RESULT FROM DISTRIBUTOR', res);
        console.log('===================================');

        // UPDATE STATE - EMIT  EVENT (WEB SOCKET)  STATE : Request to DRM // state++
        status++;
        webSocket.emitEvent(STATUS_EVENT, { status: status });

        // CALL TO ETHER - ADD VIEW // promise
        console.log('REQUEST TO PRODUCTION SERVICE', res);
        console.log('===================================');
        return ethereum.addView("megogo", 123, res);
    }).then((res) => {
        console.log('RESULT FROM PRODUCTION SERVICE', res);
        console.log('===================================');
        // UPDATE STATE - EMIT EVENT (Web socket ) : proof of giving key // state++
        status++;
        webSocket.emitEvent(STATUS_EVENT, { status: status, data: res });

        // request to CDN
        // SEND - OK
        status++;
        webSocket.emitEvent(STATUS_EVENT, { status: status });
    
    });
    res.send("ok");
});

module.exports = router;