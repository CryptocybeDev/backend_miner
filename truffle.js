require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKeys = process.env.PRIVATE_KEYS || ""

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    eth_mainnet: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys, // Array of account private keys
          `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`// Url to an Ethereum Node
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 1
    },
    goerli: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys, // Array of account private keys
          `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_GOERLI_API_KEY}`// Url to an Ethereum Node
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 5
    },
    sepolia: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys, // Array of account private keys
          `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_SEPOLIA_API_KEY}`// Url to an Ethereum Node
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 11155111
    },
    bsc_testnet: {
      provider: () => new HDWalletProvider(
        privateKeys.split(','),
        `https://data-seed-prebsc-1-s1.binance.org:8545`
      ),
      network_id: 97,
      skipDryRun: true
    },
    bsc_mainnet: {
      provider: () => new HDWalletProvider(
        privateKeys.split(','),
        `https://bsc-dataseed1.binance.org`
      ),
      network_id: 56,
      skipDryRun: true
    },
    matic: {
      provider: () => new HDWalletProvider(
        privateKeys,
        //'https://rpc-mainnet.maticvigil.com/'
        `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
      ),
      network_id: 137,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    amoy: {
      provider: () => new HDWalletProvider(
        privateKeys,
        //'https://rpc-mumbai.maticvigil.com/'
        `https://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
      ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.POLYGONSCAN_API_KEY
  },
  compilers: {
    solc: {
      version: "0.6.12",
      settings: {
        optimizer: {
          enabled: false, // Default: false
          runs: 200, // Default: 200
        },
      },
    },
  },
  
};
