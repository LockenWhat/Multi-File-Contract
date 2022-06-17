import fetch from "node-fetch";
//let API = 'https://opensea.io/assets/matic'
let API = 'https://api.opensea.io/api/v1/assets/matic'
// let API = 'https://opensea.io/api/asset/mumbai'
// let API = 'https://api.opensea.io/v1/asset/matic'
//let API = 'https://api.opensea.io/asset/matic'
//let API = 'https://api.opensea.io/api/v1/asset/matic'
//let API = 'https://api.opensea.io/api/v1/asset/matic'
async function main() {
    let fromTokenId = 9997;
    let toTokenId = 9999
    if(!process.env.NFT_CONTRACT)
        throw new Error('NFT_CONTRACT not defined')
    let contractAddress = process.env.NFT_CONTRACT
    for (let tokenId = fromTokenId; tokenId <= toTokenId; tokenId++) { 
        const url = `${API}/${contractAddress}/${tokenId}?force_update=true`; 
        console.log(url)
        await fetch(url); 
        console.log(`Done with ${tokenId}`); 
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
//https://testnets-api.opensea.io/api/v1/asset/mumbai
//https://opensea.io/api/v1/asset/mumbai