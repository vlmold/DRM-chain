var Web3 = require('web3');
var fs = require('fs');
var web3client;
var defaultAbi;
var defaultCode;
var defaultBarterAbi;
var defaultBarterCode;
var addressOwner = "0x7C3EB0aa81D4FE65525Df2Bed7A83A854fEE39C3";
var privateKey;
var path = "../../ethereum-contracts/build/contracts/DistributionAsset.json";

defaultAbi = require(path);


const contractAddress = "0x7C3EB0aa81D4FE65525Df2Bed7A83A854fEE39C3";

// const agentAddress = "0x06cad206bda3fd6c40219e1a46fe0041faee3041";
const agentAddress = "0x153f62ce2a29fe5b070ccc30b301325d2f219032";

// const agentPass = "owner";
const agentPass = "pass";


function setup() {
    if (typeof web3client !== 'undefined') {
        web3client = new Web3(web3client.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3client = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }


    unlock().then((res) => {
        console.log("unlock success");
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
    console.log("Unlock account");

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


function addView(addr, token) {

    let contract = new web3client.eth.Contract(defaultAbi, contractAddress);

    return new Promise((resolve, reject) => {

        console.log("=================================")
        console.log("Contract Address : ", addr)

        contract.methods.addProofOfView(addr, token)
            .send({ from: agentAddress, gas: 700000 })
            .then(function (result) {
                console.log("Execution result : ", result)
                resolve(result);
            }).catch(function (err) {
                console.log("=================================")
                console.log("REMOTE NODE USE 1.8.1 VERSION (reciept for web3 doesn't work) : ", addr)
                resolve(err);
            });
    })
}


exports.setup = setup;
exports.deploy = deploy;
exports.test = test;
exports.unlock = unlock;
exports.addView = addView;