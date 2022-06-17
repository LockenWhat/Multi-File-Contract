require('dotenv').config()
import { ethers } from "hardhat";

async function main() {
    const result = await ethers.getSigners();
    let user = result[0]
    console.log(user.address)

    if(!process.env.NFT_CONTRACT)
        throw new Error('NFT_CONTRACT not defined')
    let nftAddress = process.env.NFT_CONTRACT
    const nft = await ethers.getContractAt("FFWClubNFT", nftAddress);

    console.log("NFT deployed to:", nft.address);

    console.log(await nft.WETH())
    let tx = await nft.setLimits(1, 1, 1, 1, 1, 3000, 0, 7000, 0, 0)
    await tx.wait()
    console.log('limits set')
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});