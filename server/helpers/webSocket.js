
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


function emitEvent(eventType, eventData) {
    //parse payload event info
    logger.log("event: ", eventType, eventData);
    websocket.emit(eventType, eventData);
}

function emitError(error) {
    console.log('error');
    logger.error(error);
    websocket.emit(error);
}

exports.setupWebSocket = setupWebSocket;
exports.emitEvent = emitEvent;
exports.emitError = emitError;
