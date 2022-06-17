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
    // https://speedy-nodes-nyc.moralis.io/e814489705c92e61b62a5fbc/polygon/mainnet
    let to = '0x4a7702703823922d1e305d1c07Bd1694e72BfF3B'
    let nonce = await user.getTransactionCount()
    console.log({nonce})
    for(let i=9999; i<100000; ++i) {
        let owner = await nft.ownerOf(i)
        console.log(owner, i)
        if(owner == user.address) {
            console.log('transfering', i)
            const tx = await nft.transferFrom(user.address, to, i, {gasPrice: 100000000000, gasLimit: '200795', nonce})
            console.log('hash', tx.hash)
            await tx.wait(2)
            console.log('transfer done', i)
            ++nonce;
            console.log({nonce})
        }
    }
    // console.log(await nft.phase())
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});