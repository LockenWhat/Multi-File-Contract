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

    const tx = await nft.setMerkleMintVerification(false)
    await tx.wait()
    console.log('merkle mint disabled')
    // console.log(await nft.phase())
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});