
const express = require('express');
const logger = require('../helpers/logger');

//use socket io
const io = require('socket.io');
let websocket;

function setupWebSocket(server) {
    websocket = io.listen(server);
    websocket.on('connection', function (socket) {
        console.log('new session');
    });
    websocket.on('disconnect', function () {
        console.log('disconnect');
    });
}


function emitEvent(event) {
    //parse payload event info
    let eventType = JSON.parse(event.event_name);
    let eventResult = {};
    eventResult.eventType = eventType;
    eventResult.payload = event.payload.toString();
    websocket.emit(JSON.stringify(eventType), eventResult);
}

function emitError(error) {
    console.log('error');
    logger.error(error);
    websocket.emit(error);
}

exports.setupWebSocket = setupWebSocket;