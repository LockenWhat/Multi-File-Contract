// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const result = await ethers.getSigners();
  let user = result[0]
  console.log(user.address)

  if(!process.env.WETH)
    throw new Error("WETH is not specified in .env")
    
  let clientTestAddress = '0xb0Fb91eB0f26c79E66d002F66a80A6E95BA3E462'

  // We get the contract to deploy
  if(!process.env.WYVERN_PROXY)
        throw new Error('WYVERN_PROXY is needed')
  const wyvernProxy = process.env.WYVERN_PROXY
  
  console.log('deploying contract')
  // const nft = await ethers.getContractAt("FFWClubNFT", '0xb0A7b60C696688583B6d76f767cBcc767771ca4d');
  const NFT = await ethers.getContractFactory('FFWClubNFT')
  const nft = await NFT.deploy(wyvernProxy, 10000,
    process.env.WETH);

  await nft.deployed();

  console.log("NFT deployed to:", nft.address);

  // const Factory = await ethers.getContractFactory('FFWClubFactory')
  // const factory = await Factory.deploy(wyvernProxyRinkeby, nft.address)
  // await factory.deployed()
  // console.log("Factory deployed to:", factory.address);

  // await (await (factory.setBaseURI('ipfs://bafybeibeb2t5dmq2nggyuclyeh5yv7trc46q2mu5pxblxrgy2dfdmny7rq/out/'))).wait()
  // console.log('factory base url set')
  
  // Presale URL
  await (await nft.setBaseURI('ipfs://bafkreicgmmr5qjg3svsdx23eflqthr26uamkb4qduag75uq32ilzzbayjm')).wait()
  console.log('base uri set')
  
  // await (await nft.setLimits(5, 5, 5, 5, 5, 10, 10, 10, 10, 20)).wait()
  // console.log('limits set')
  // let mintPrice = ethers.utils.parseEther('0.000000001').toString()
  // await (await nft.setPhaseAndMintPrice(1, mintPrice)).wait()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// meta files
// ipfs://bafybeibeb2t5dmq2nggyuclyeh5yv7trc46q2mu5pxblxrgy2dfdmny7rq/out/
// https://bafybeibeb2t5dmq2nggyuclyeh5yv7trc46q2mu5pxblxrgy2dfdmny7rq.ipfs.dweb.link/out/

// pre sale image
// ipfs://bafkreibalz5k5tzo43mezytbsfh2e7lbvxlprvfjfv2lndentncyvuj42m
// https://bafkreibalz5k5tzo43mezytbsfh2e7lbvxlprvfjfv2lndentncyvuj42m.ipfs.dweb.link/

// pre sale meta data
// ipfs://bafkreif6wlyjldytjws54zkqldxhdxafvmhtckybgvn2o3u5zi2bjevizq