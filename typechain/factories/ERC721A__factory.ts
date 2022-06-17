/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ERC721A, ERC721AInterface } from "../ERC721A";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ApprovalCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "ApprovalQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "ApprovalToCurrentOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "ApproveToCaller",
    type: "error",
  },
  {
    inputs: [],
    name: "BalanceQueryForZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnerQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFromIncorrectOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToNonERC721ReceiverImplementer",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "URIQueryForNonexistentToken",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001283380380620012838339810160408190526200003491620001c5565b8151620000499060029060208501906200006c565b5080516200005f9060039060208401906200006c565b505060008055506200027f565b8280546200007a906200022c565b90600052602060002090601f0160209004810192826200009e5760008555620000e9565b82601f10620000b957805160ff1916838001178555620000e9565b82800160010185558215620000e9579182015b82811115620000e9578251825591602001919060010190620000cc565b50620000f7929150620000fb565b5090565b5b80821115620000f75760008155600101620000fc565b600082601f83011262000123578081fd5b81516001600160401b038082111562000140576200014062000269565b604051601f8301601f19908116603f011681019082821181831017156200016b576200016b62000269565b8160405283815260209250868385880101111562000187578485fd5b8491505b83821015620001aa57858201830151818301840152908201906200018b565b83821115620001bb57848385830101525b9695505050505050565b60008060408385031215620001d8578182fd5b82516001600160401b0380821115620001ef578384fd5b620001fd8683870162000112565b9350602085015191508082111562000213578283fd5b50620002228582860162000112565b9150509250929050565b600181811c908216806200024157607f821691505b602082108114156200026357634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b610ff4806200028f6000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101d6578063b88d4fde146101e9578063c87b56dd146101fc578063e985e9c51461020f57600080fd5b80636352211e146101a857806370a08231146101bb57806395d89b41146101ce57600080fd5b8063095ea7b3116100c8578063095ea7b31461015757806318160ddd1461016c57806323b872dd1461018257806342842e0e1461019557600080fd5b806301ffc9a7146100ef57806306fdde0314610117578063081812fc1461012c575b600080fd5b6101026100fd366004610d8f565b61024b565b60405190151581526020015b60405180910390f35b61011f61029d565b60405161010e9190610e77565b61013f61013a366004610dc7565b61032f565b6040516001600160a01b03909116815260200161010e565b61016a610165366004610d66565b610373565b005b600154600054035b60405190815260200161010e565b61016a610190366004610c1c565b610401565b61016a6101a3366004610c1c565b61040c565b61013f6101b6366004610dc7565b610427565b6101746101c9366004610bd0565b610439565b61011f610488565b61016a6101e4366004610d2c565b610497565b61016a6101f7366004610c57565b61052d565b61011f61020a366004610dc7565b61057e565b61010261021d366004610bea565b6001600160a01b03918216600090815260076020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061027c57506001600160e01b03198216635b5e139f60e01b145b8061029757506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600280546102ac90610ef9565b80601f01602080910402602001604051908101604052809291908181526020018280546102d890610ef9565b80156103255780601f106102fa57610100808354040283529160200191610325565b820191906000526020600020905b81548152906001019060200180831161030857829003601f168201915b5050505050905090565b600061033a82610610565b610357576040516333d1c03960e21b815260040160405180910390fd5b506000908152600660205260409020546001600160a01b031690565b600061037e82610427565b9050806001600160a01b0316836001600160a01b031614156103b35760405163250fdee360e21b815260040160405180910390fd5b336001600160a01b038216148015906103d357506103d1813361021d565b155b156103f1576040516367d9dca160e11b815260040160405180910390fd5b6103fc83838361063b565b505050565b6103fc838383610697565b6103fc8383836040518060200160405280600081525061052d565b600061043282610886565b5192915050565b60006001600160a01b038216610462576040516323d3ad8160e21b815260040160405180910390fd5b506001600160a01b031660009081526005602052604090205467ffffffffffffffff1690565b6060600380546102ac90610ef9565b6001600160a01b0382163314156104c15760405163b06307db60e01b815260040160405180910390fd5b3360008181526007602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b610538848484610697565b6001600160a01b0383163b1515801561055a5750610558848484846109a2565b155b15610578576040516368d2bf6b60e11b815260040160405180910390fd5b50505050565b606061058982610610565b6105a657604051630a14c4b560e41b815260040160405180910390fd5b60006105bd60408051602081019091526000815290565b90508051600014156105de5760405180602001604052806000815250610609565b806105e884610a9a565b6040516020016105f9929190610e0b565b6040516020818303038152906040525b9392505050565b6000805482108015610297575050600090815260046020526040902054600160e01b900460ff161590565b60008281526006602052604080822080546001600160a01b0319166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b60006106a282610886565b9050836001600160a01b031681600001516001600160a01b0316146106d95760405162a1148160e81b815260040160405180910390fd5b6000336001600160a01b03861614806106f757506106f7853361021d565b806107125750336107078461032f565b6001600160a01b0316145b90508061073257604051632ce44b5f60e11b815260040160405180910390fd5b6001600160a01b03841661075957604051633a954ecd60e21b815260040160405180910390fd5b6107656000848761063b565b6001600160a01b038581166000908152600560209081526040808320805467ffffffffffffffff1980821667ffffffffffffffff92831660001901831617909255898616808652838620805493841693831660019081018416949094179055898652600490945282852080546001600160e01b031916909417600160a01b4290921691909102178355870180845292208054919390911661083b57600054821461083b578054602086015167ffffffffffffffff16600160a01b026001600160e01b03199091166001600160a01b038a16171781555b50505082846001600160a01b0316866001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050505050565b60408051606081018252600080825260208201819052918101919091528160005481101561098957600081815260046020908152604091829020825160608101845290546001600160a01b0381168252600160a01b810467ffffffffffffffff1692820192909252600160e01b90910460ff161515918101829052906109875780516001600160a01b03161561091d579392505050565b5060001901600081815260046020908152604091829020825160608101845290546001600160a01b038116808352600160a01b820467ffffffffffffffff1693830193909352600160e01b900460ff1615159281019290925215610982579392505050565b61091d565b505b604051636f96cda160e11b815260040160405180910390fd5b604051630a85bd0160e11b81526000906001600160a01b0385169063150b7a02906109d7903390899088908890600401610e3a565b602060405180830381600087803b1580156109f157600080fd5b505af1925050508015610a21575060408051601f3d908101601f19168201909252610a1e91810190610dab565b60015b610a7c573d808015610a4f576040519150601f19603f3d011682016040523d82523d6000602084013e610a54565b606091505b508051610a74576040516368d2bf6b60e11b815260040160405180910390fd5b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490505b949350505050565b606081610abe5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610ae85780610ad281610f34565b9150610ae19050600a83610ea2565b9150610ac2565b60008167ffffffffffffffff811115610b1157634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015610b3b576020820181803683370190505b5090505b8415610a9257610b50600183610eb6565b9150610b5d600a86610f4f565b610b68906030610e8a565b60f81b818381518110610b8b57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350610bad600a86610ea2565b9450610b3f565b80356001600160a01b0381168114610bcb57600080fd5b919050565b600060208284031215610be1578081fd5b61060982610bb4565b60008060408385031215610bfc578081fd5b610c0583610bb4565b9150610c1360208401610bb4565b90509250929050565b600080600060608486031215610c30578081fd5b610c3984610bb4565b9250610c4760208501610bb4565b9150604084013590509250925092565b60008060008060808587031215610c6c578081fd5b610c7585610bb4565b9350610c8360208601610bb4565b925060408501359150606085013567ffffffffffffffff80821115610ca6578283fd5b818701915087601f830112610cb9578283fd5b813581811115610ccb57610ccb610f8f565b604051601f8201601f19908116603f01168101908382118183101715610cf357610cf3610f8f565b816040528281528a6020848701011115610d0b578586fd5b82602086016020830137918201602001949094529598949750929550505050565b60008060408385031215610d3e578182fd5b610d4783610bb4565b915060208301358015158114610d5b578182fd5b809150509250929050565b60008060408385031215610d78578182fd5b610d8183610bb4565b946020939093013593505050565b600060208284031215610da0578081fd5b813561060981610fa5565b600060208284031215610dbc578081fd5b815161060981610fa5565b600060208284031215610dd8578081fd5b5035919050565b60008151808452610df7816020860160208601610ecd565b601f01601f19169290920160200192915050565b60008351610e1d818460208801610ecd565b835190830190610e31818360208801610ecd565b01949350505050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090610e6d90830184610ddf565b9695505050505050565b6020815260006106096020830184610ddf565b60008219821115610e9d57610e9d610f63565b500190565b600082610eb157610eb1610f79565b500490565b600082821015610ec857610ec8610f63565b500390565b60005b83811015610ee8578181015183820152602001610ed0565b838111156105785750506000910152565b600181811c90821680610f0d57607f821691505b60208210811415610f2e57634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415610f4857610f48610f63565b5060010190565b600082610f5e57610f5e610f79565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b031981168114610fbb57600080fd5b5056fea264697066735822122024ba97f8e732339fb9626fd54b1e6bdebfa2673dae14eccb6a2f4228b67c9e3864736f6c63430008040033";

export class ERC721A__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC721A> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<ERC721A>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  attach(address: string): ERC721A {
    return super.attach(address) as ERC721A;
  }
  connect(signer: Signer): ERC721A__factory {
    return super.connect(signer) as ERC721A__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721AInterface {
    return new utils.Interface(_abi) as ERC721AInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721A {
    return new Contract(address, _abi, signerOrProvider) as ERC721A;
  }
}