/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  WithLimitedSupply,
  WithLimitedSupplyInterface,
} from "../WithLimitedSupply";

const _abi = [
  {
    inputs: [],
    name: "availableTokenCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxAvailableSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class WithLimitedSupply__factory {
  static readonly abi = _abi;
  static createInterface(): WithLimitedSupplyInterface {
    return new utils.Interface(_abi) as WithLimitedSupplyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WithLimitedSupply {
    return new Contract(address, _abi, signerOrProvider) as WithLimitedSupply;
  }
}