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

    if(!process.env.NFT_CONTRACT)
        throw new Error('NFT_CONTRACT not defined')
    let nftAddress = process.env.NFT_CONTRACT

    if(!process.env.WYVERN_PROXY)
        throw new Error('WYVERN_PROXY is needed')
    const wyvernProxy = process.env.WYVERN_PROXY
    const Factory = await ethers.getContractFactory('FFWClubFactory')
    const factory = await Factory.deploy(wyvernProxy, nftAddress)
    await factory.deployed()
    console.log("Factory deployed to:", factory.address);

    await (await (factory.setBaseURI('ipfs://bafkreia4vi23obrajrx5bkp4qofbdu3kouejesqdbv3b2wyzjzci667cuq/out/'))).wait()
    console.log('factory base url set')

    // await (await (factory.mint(10, user.address))).wait()
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