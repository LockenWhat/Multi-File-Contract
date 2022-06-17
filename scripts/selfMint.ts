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

    // Read only functions
    let supply = await nft.totalSupply()
    console.log(supply)

    let remaining = 10000 - supply.toNumber();

    // Write methods: 
    // unpause the contract
    // let tx = await nft.setPaused(false)
    // await tx.wait()
    // console.log('unpaused')

    //let tx = await nft.mintToTeam([49], ['0x6426114c0C3531D90Ed8B9f7c09A0dc115F4aaee'])
    //await tx.wait()
    //console.log('team mint done')

    let selfMintQty = remaining 
    console.log(selfMintQty)
    let tx = await nft.selfMint(user.address, selfMintQty)
    await tx.wait()
    console.log('self mint done')
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});