var fs = require('fs');
var web3Service = require('./web3.service.js');

async function deploy() {
    let unlockAccount = await web3Service.unlock();
    let res = await web3Service.deploy(["test"]);
    return res;
}

async function addView(distributor, tokenId) {
    let res = await new Promise((resolve, reject) => {
       setTimeout(() => {
           resolve()
       }, 1000);
    });
    return res;
}

exports.deploy = deploy;
exports.addView = addView;
