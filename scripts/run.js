const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners()
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal')
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  })
  await waveContract.deployed()
  console.log('Contract addy:', waveContract.address)

  // deployer balance
  accountBalance = await owner.getBalance()
  console.log('Account balance: ', accountBalance.toString())

  // Get contract balance
  let contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
  console.log("Contract balance", hre.ethers.utils.formatEther(contractBalance))

  // get Total waves
  let waveCount = await waveContract.getTotalWaves()
  console.log(waveCount.toNumber())

  // sending some waves
  let waveTxn = await waveContract.wave('A message!')
  await waveTxn.wait() // Wait for the transaction to be mined
  // getting balance after a wave
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
  console.log("Contract balance", hre.ethers.utils.formatEther(contractBalance))

  waveTxn = await waveContract.connect(randomPerson).wave('Another message!')
  await waveTxn.wait() // Wait for the transaction to be mined
  // getting balance after a wave
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
  console.log("Contract balance", hre.ethers.utils.formatEther(contractBalance))

  // Get all waves array
  let allWaves = await waveContract.getAllWaves()
  console.log(allWaves)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runMain()
