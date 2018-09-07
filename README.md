# Ethereum Property Asset App

This repository holds the setup and the deployment of a Property Asset Hash Storage smart contract into Ethereum.

## Introduction

Ethereum is a decentralized platform that runs smart contracts: applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third-party interference.

### Ethereum has a few public test blockchains and one main blockchain.

Testnet: There are a few test blockchains such as Ropsten, Rinkeby, Kovan. Think of these as a QA or a staging server, they are used for testing purposes only. All the Ether you use on these networks is fake.

Mainnet (also called Homestead): This is the blockchain which the entire world transacts on for real. There is real value to the Ether you use on this network.

## Install geth and sync the blockchain
Install geth - the client software used to download the blockchain and run the Ethereum node on your local machine.

```
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository -y ppa:ethereum/ethereum
$ sudo apt-get update
$ sudo apt-get install ethereum
```

Once you have installed geth, run the below command in your command line console:
```
$ geth --rinkeby --syncmode "fast" --rpc --rpcapi db,eth,net,web3,personal --cache=1024  --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*"
```

This will start the Ethereum node, connect to other peer nodes and start downloading the blockchain. The time it takes to download the blockchain depends on various factors like your internet connection speed, RAM on your computer, type of hard drive etc.

```
I0130 22:18:15.116332 core/blockchain.go:1064] imported   32 blocks,    49 txs (  6.256 Mg) in 185.716ms (33.688 Mg/s). #445097 [e1199364… / bce20913…]
I0130 22:18:20.267142 core/blockchain.go:1064] imported    1 blocks,     1 txs (  0.239 Mg) in  11.379ms (20.963 Mg/s). #445097 [b4d77c46…]
I0130 22:18:21.059414 core/blockchain.go:1064] imported    1 blocks,     0 txs (  0.000 Mg) in   7.807ms ( 0.000 Mg/s). #445098 [f990e694…]
I0130 22:18:34.367485 core/blockchain.go:1064] imported    1 blocks,     0 txs (  0.000 Mg) in   4.599ms ( 0.000 Mg/s). #445099 [86b4f29a…]
I0130 22:18:42.953523 core/blockchain.go:1064] imported    1 blocks,     2 txs (  0.294 Mg) in   9.149ms (32.136 Mg/s). #445100 [3572f223…]
```

## Install the Truffle Framework

```
npm install -g truffle
```

## Set up the Property Asset contract
```
$ mkdir voting
$ cd voting
$ npm install -g webpack
$ truffle unbox webpack
$ ls
README.md               contracts               node_modules            test                    webpack.config.js       truffle.js
app                     migrations              package.json
$ ls contracts/
ConvertLib.sol  MetaCoin.sol  Migrations.sol
$ ls migrations/
1_initial_migration.js  2_deploy_contracts.js
```

delete the ConvertLib.sol and MetaCoin.sol files in the contracts directory for this project.

The very first migration 1_initial_migration.js deploys a contract named Migrations to the blockchain and is used to store the latest contract you have deployed. Every time you run the migration, truffle queries the blockchain to get the last contract that has been deployed and then deploys any contracts which haven’t been deployed yet. It then updates the last_completed_migration field in the Migrations contract to indicate the latest contract deployed. You can simply think of it as a database table called Migration with a column named last_completed_migration which is kept up to date always. You can find more details on the truffle documentation page.

Update PropertyAssetHash.sol with the following code

```
pragma solidity ^0.4.11;
// We have to specify what version of compiler this code will compile with

contract PropertyDocHash {

  /* mapping field below is equivalent to an associative array or hash. 
  key < 32 bytes so its datatype is bytes32 and hashValue > 32 bytes 
  so its datatype is string */

  mapping (bytes32 => string) public hashArr;

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. Currently its an empty 
  */

  function FileHash() { }

  /* key can be either PropertyID, Filename and hashValue can be IPFS hash or 
  an any generated hash. hashArr stores the key mapped to hashValue */

  function setHash(bytes32 key, string hashValue) {
    hashArr[key] = hashValue;
  }

  /* This function returns the hash value mapped to the key */
  function getHash(bytes32 key) returns (string) {
    return hashArr[key];
  }
}

```

```
$ ls contracts/
Migrations.sol  PropertyAssetHash.sol
```

Replace the contents of 2_deploy_contracts.js in the migrations directory with the following:
```
var PropertyAssetHash = artifacts.require("./PropertyAssetHash.sol");

module.exports = function(deployer) {
  deployer.deploy(PropertyAssetHash);
};
```

## Deploy the contract to network
Before we can deploy the contract, we will need an account and some ether. When we used ganache, it created 10 test accounts and came preloaded with 100 test ethers. But for testnet and mainnet we have to create the account and add some ether ourselves.

In your command line terminal, do the following:

```
$ truffle console
truffle(default)> web3.personal.newAccount('verystrongpassword')
'0x95a94979d86d9c32d1d2ab5ace2dcc8d1b446fa1'
truffle(default)> web3.eth.getBalance('0x95a94979d86d9c32d1d2ab5ace2dcc8d1b446fa1')
{ [String: '0'] s: 1, e: 0, c: [ 0 ] }
truffle(default)> web3.personal.unlockAccount('0x95a94979d86d9c32d1d2ab5ace2dcc8d1b446fa1', 'verystrongpassword', 15000)
// Replace 'verystrongpassword' with a good strong password.
// The account is locked by default, make sure to unlock it before using the account for deploying and interacting with the blockchain.
```

Now that you have some ether, go ahead and compile and deploy the contract to the blockchain. Below is the command to run and the output you will see if everything goes well.

```
$ truffle migrate
Compiling Migrations.sol...
Compiling Voting.sol...
Writing artifacts to ./build/contracts
Running migration: 1_initial_migration.js
Deploying Migrations...
Migrations: 0x3cee101c94f8a06d549334372181bc5a7b3a8bee
Saving successful migration to network...
Saving artifacts...
Running migration: 2_deploy_contracts.js
Deploying Voting...
Voting: 0xd24a32f0ee12f5e9d233a2ebab5a53d4d4986203
Saving successful migration to network...
Saving artifacts...
```
