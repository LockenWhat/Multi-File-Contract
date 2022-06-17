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
  let clientTestAddress = '0xb0Fb91eB0f26c79E66d002F66a80A6E95BA3E462'
  // We get the contract to deploy
  //const Greeter = await ethers.getContractFactory("Greeter");
  let wyvernProxyRinkeby = '0xf57b2c51ded3a29e6891aba85459d600256cf317'
  const FFWClub = await ethers.getContractFactory("WHAT-TO-PUT-HERE-BRUH");
  //const greeter = await Greeter.deploy("Hello, Hardhat!");
  const FFWC = await FFWClub.deploy();
 // await greeter.deployed();
  //console.log("Greeter deployed to:", greeter.address);
  await FFWC.deployed();
  console.log("FFWClub deployed to:", FFWC.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
