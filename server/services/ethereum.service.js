var fs = require('fs');
var web3Service = require('./web3.service.js');

async function deploy() {
    let unlockAccount = await web3Service.unlock();
    let res = await web3Service.deploy(["test"]);
    return res;
}

async function addView(distributor, tokenId) {

    let unlockAccount = await web3Service.unlock();

    console.log(unlockAccount);

    let res = await web3Service.addView("0x5656e340a0fc4581ee2acd7ec3d3f79d655de433", 1234);
    return res;
}
async function checkView(distributor, tokenId) {

    let unlockAccount = await web3Service.unlock();

    console.log(unlockAccount);
    
    let res = await web3Service.checkView("0x5656e340a0fc4581ee2acd7ec3d3f79d655de433");
    return res;
}
exports.deploy = deploy;
exports.addView = addView;
