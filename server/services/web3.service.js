var Web3 = require('web3');
var fs = require('fs');
var web3client;
var defaultAbi;
var defaultCode;
var defaultBarterAbi;
var defaultBarterCode;
var addressOwner;
var privateKey;
var logger = require('./logger');
var path = "./ethereum-contracts/build/Test.,json";
const agentAddress = "0x153f62ce2a29fe5b070ccc30b301325d2f219032";
const agentPass = "pass";

function setup() {
    if (typeof web3client !== 'undefined') {
        web3client = new Web3(web3client.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3client = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    //
    //clear storage
    addressOwner = owner;
    privateKey = key;
    // fs.unlinkSync(path);
    // fs.closeSync(fs.openSync(path, 'w'));

    //TODO : UNLOCK 

    //unlock account 
    //web3client.eth.personal.unlockAccount(addressOwner, privateKey);

    unlock().then((res) => {
        console.log("unlock success");
        // TODO : GET ABI
        let source = fs.readFileSync(path);
        let contracts = JSON.parse(source)["contracts"];

        defaultAbi = JSON.parse(contracts.Test.abi);
        defaultCode = contracts.Test.bin;
    })





}

function deploy(args) {

    var myContract = new web3client.eth.Contract(defaultAbi, {
        from: addressOwner, // default from address
        gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    });
    myContract.options.data = defaultCode;

    return myContract.deploy({
        arguments: args
    }).send({
        from: addressOwner,
        gas: 1500000,
        gasPrice: '300000'
    });
}

function unlock() {
    return web3client.eth.personal.unlockAccount(agentAddress, agentPass);
}
function test(contractAddress) {
    var contract = new web3client.eth.Contract(defaultAbi, contractAddress);
    return new Promise((resolve, reject) => {
        // do some action
        // ticketContract.methods.ticketMap(parseInt(id)).call({ from: addressOwner }).then(function (result) {
        //     logger.debug(result);
        //     resolve(result);
        // });
    })

}



exports.setup = setup;
exports.deploy = deploy;
exports.test = test;
exports.unlock = unlock;