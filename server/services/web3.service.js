var Web3 = require('web3');
var fs = require('fs');
var web3client;
var defaultAbi;
var defaultCode;
var defaultBarterAbi;
var defaultBarterCode;
var addressOwner = "0x06cad206bda3fd6c40219e1a46fe0041faee3041";
var privateKey;
var path = "./ethereum-contracts/build/DistributionAsset.json";


const contractAddress = "0x66346bfd795f1e9168914e6191d209e4e9e3ac68";

const agentAddress = "0x06cad206bda3fd6c40219e1a46fe0041faee3041";
const agentPass = "owner";

function setup() {
    if (typeof web3client !== 'undefined') {
        web3client = new Web3(web3client.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3client = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    //
    //clear storage
    // addressOwner = owner;
    // privateKey = key;
    // fs.unlinkSync(path);
    // fs.closeSync(fs.openSync(path, 'w'));

    //TODO : UNLOCK 

    //unlock account 
    //web3client.eth.personal.unlockAccount(addressOwner, privateKey);

    unlock().then((res) => {
        console.log("unlock success");

        defaultAbi = fs.readFileSync(path);
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


function addView(addr, token){

    var contract = new web3client.eth.Contract(defaultAbi, contractAddress);
    return new Promise((resolve, reject) => {

        console.log("addView contracr");

        console.log(contract);

        contract.methods.addProofOfView(addr, parseInt(token))
            .call({ from: addressOwner })
            .then(function (result) {
                logger.debug(result);

                console.log(result);

                resolve(result);
        }).catch(function (err) {
            console.log(err);
        });
    })
}


exports.setup = setup;
exports.deploy = deploy;
exports.test = test;
exports.unlock = unlock;
exports.addView = addView;