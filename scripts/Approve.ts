
 /*import { ethers } from "hardhat";
 console.log('hi')
 async function main() {
     let nftAddress = '0xb0A7b60C696688583B6d76f767cBcc767771ca4d'
     let op = '0x0B6eF145a7698410A0CfC0c3187C50cad49571cD'
     const nft = await ethers.getContractAt("FFWClubNFT", nftAddress);
     const tx = await nft.setApprovalForAll(op, true)
     console.log(tx.hash)
     await tx.wait(2)
     console.log('Approved')
 }*/

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
    let nonce = await user.getTransactionCount()
    console.log({nonce})
    let op = '0x4a7702703823922d1e305d1c07Bd1694e72BfF3B'
    const tx = await nft.setApprovalForAll(op, true)
     console.log(tx.hash)
     await tx.wait(2)
     console.log('Approved')

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});