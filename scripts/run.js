const main = async () => {
  const [_, randomPerson] = await hre.ethers.getSigners()
  const waveContractFacory = await hre.ethers.getContractFactory('WavePortal')
  const waveContract = await waveContractFacory.deploy()
  await waveContract.deployed()

  let waveCount = await waveContract.getTotalWaves()
  console.log(waveCount.toNumber())

  // sending some waves
  let waveTxn = await waveContract.wave('A message!')
  await waveTxn.wait() // Wait for the transaction to be mined

  waveTxn = await waveContract.connect(randomPerson).wave('Another message!')
  await waveTxn.wait() // Wait for the transaction to be mined

  let allWaves = await waveContract.getAllWaves()
  console.log(allWaves)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    process.exit(1)
  }
}

runMain()
