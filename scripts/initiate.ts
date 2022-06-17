const opensea = require("opensea-js");
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;

const PrivateKeyWalletSubprovider = require('@0x/subproviders').PrivateKeyWalletSubprovider // subproviders import
const RPCSubprovider = require("web3-provider-engine/subproviders/rpc");
const Web3ProviderEngine = require("web3-provider-engine");
import { ethers } from "hardhat";

if(!process.env.POLYGON_MUMBAI_RPC)
    throw new Error('only supports MUMBAI for now')

const infuraRpcSubprovider = new RPCSubprovider({
    rpcUrl: process.env.POLYGON_MUMBAI_RPC
});
    
const privateKeyWalletSubprovider = new PrivateKeyWalletSubprovider(process.env.PRIVATE_KEY)
const providerEngine = new Web3ProviderEngine();
providerEngine.addProvider(privateKeyWalletSubprovider);
providerEngine.addProvider(infuraRpcSubprovider);
providerEngine.start();

async function main() {
    const seaport = new OpenSeaPort(
      providerEngine,
      {
        networkName: 'mumbai',
        apiKey: process.env.OPENSEA_API
      }
    );

    const result = await ethers.getSigners();
    let user = result[0]
    console.log(user.address)

    if(!process.env.FACTORY)
      throw new Error('FACTORY is needed')
    
    const myFactory = await ethers.getContractAt("MyFactory", process.env.FACTORY, user)
    console.log('Factory deployed', myFactory.address)

    console.log("Creating fixed price auctions...");
    const fixedSellOrders = await seaport.createFactorySellOrders({
      assets: [
        {
          tokenId: 0,
          tokenAddress: myFactory.address,
        }
      ],
      accountAddress: user.address,
      startAmount: 0.001,
      numberOfOrders: 1,
    });
    console.log('orders created', fixedSellOrders.length)
    console.log(fixedSellOrders);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});