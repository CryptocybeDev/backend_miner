const Cryptocybe = artifacts.require('Cryptocybe.sol')
const CryptocybeMiner = artifacts.require('CryptocybeMiner.sol')

module.exports = async function(deployer) {
  // Deploy Cryptocybe Token
  await deployer.deploy(Cryptocybe)
  const cryptocybe = await Cryptocybe.deployed()

  // Deploy CryptocybeMiner Contract
  await deployer.deploy(
    CryptocybeMiner,
    cryptocybe.address,
    process.env.DEV_ADDRESS, // Your address where you get Cyb tokens - should be a multisig
    web3.utils.toWei(process.env.TOKENS_PER_BLOCK), // Number of tokens rewarded per block, e.g., 100
    process.env.START_BLOCK, // Block number when token mining starts
    process.env.BONUS_END_BLOCK // Block when bonus ends
  )

  // Make CryptocybeMiner contract token owner
  const cryptocybeMiner = await CryptocybeMiner.deployed()
  await cryptocybe.transferOwnership(cryptocybeMiner.address)

  // Add Liquidity pool for rewards, e.g., "BRLC/DAI Pool" - Pool id=0
  await cryptocybeMiner.add(
    process.env.ALLOCATION_POINT,
    process.env.LP_TOKEN_ADDRESS_BRLC_DAI,
    false
  )

  // Add Liquidity pool for rewards, e.g., "BRLC/USDC Pool" - Pool id=1
  await cryptocybeMiner.add(
    process.env.ALLOCATION_POINT,
    process.env.LP_TOKEN_ADDRESS_BRLC_USDC,
    false
  )

  // Add Liquidity pool for rewards, e.g., "BRLC/USDT Pool" - Pool id=2
  await cryptocybeMiner.add(
    process.env.ALLOCATION_POINT,
    process.env.LP_TOKEN_ADDRESS_BRLC_USDT,
    false
  )

  // // Add Liquidity pool for rewards, e.g., "BRLC/BUSD Pool" - Pool id=3
  // await cryptocybeMiner.add(
  //   process.env.ALLOCATION_POINT,
  //   process.env.LP_TOKEN_ADDRESS_BRLC_BUSD,
  //   false
  // )
  
  console.log('In frontend/src/sushi/lib/constants.js scroll to CHAIN_ID 5 (if deployed on Goerli) or CHAIN_ID 97 (if deployed on bsc_testnet)')
  console.log(`\nPaste this ${cryptocybe.address} into contractAddresses/sushi`)
  console.log(`\nPaste this ${cryptocybeMiner.address} into contractAddresses/masterChef`)

  // Add more liquidity pools here upon deployment, or add them later manually
}
