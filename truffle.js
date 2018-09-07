// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // match any network
    },
    live: {
      host: "localhost", // "**.**.**.***", // Random IP for example purposes (do not use)
      port: 8545,
      network_id: 1,        // Ethereum public network
      gas: 471238,
      from: "<your_mainnet_address>", 
      // optional config values:
      // gas
      // gasPrice
      // from - default address to use for any transaction Truffle makes during migrations
      // provider - web3 provider instance Truffle should use to talk to the Ethereum network.
      //          - if specified, host and port are ignored.
    }
  }
}

