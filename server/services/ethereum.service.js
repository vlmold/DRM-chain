var fs = require('fs');
var web3Service = require('./web3.service.js');


var logger = require('./logger');

async function deploy() {
    let unlockAccount = await web3Service.unlock();
    let res = await web3Service.deploy(["test"]);
}


exports.setup = setup;
exports.deploy = deploy;
exports.test = test;