// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./interfaces/IFactoryERC721.sol";
import "./FFWClub-NFT.sol";

contract FFWClubFactory is FactoryERC721, Ownable {
    using Strings for string;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    address public proxyRegistryAddress;
    address public nftAddress;
    string public baseURI = "ipfs://bafybeibeb2t5dmq2nggyuclyeh5yv7trc46q2mu5pxblxrgy2dfdmny7rq/out/";

    bool public metadataIsFrozen = false;

    /*
     * Enforce the existence of only 100 OpenSea creatures.
     */

    /*
     * Three different options for minting Creatures (basic, premium, and gold).
     */
    uint256 NUM_OPTIONS = 100;
    uint256 SINGLE_CREATURE_OPTION = 0;

    constructor(address _proxyRegistryAddress, address _nftAddress) {
        proxyRegistryAddress = _proxyRegistryAddress;
        nftAddress = _nftAddress;

        FFWClubNFT nft = FFWClubNFT(nftAddress);
        NUM_OPTIONS = nft.MAX_SUPPLY();
        fireTransferEvents(address(0), owner());
    }

    function name() override external pure returns (string memory) {
        return "Furry Fox Woodside Club";
    }

    function symbol() override external pure returns (string memory) {
        return "FFWClub";
    }

    function supportsFactoryInterface() override public pure returns (bool) {
        return true;
    }

    function setBaseURI(string memory _baseURI) public onlyOwner {
        require(!metadataIsFrozen, "Metadata is permanently frozen");
        baseURI = _baseURI;
    }

    function numOptions() override public view returns (uint256) {
        return NUM_OPTIONS;
    }

    function transferOwnership(address newOwner) override public onlyOwner {
        address _prevOwner = owner();
        super.transferOwnership(newOwner);
        fireTransferEvents(_prevOwner, newOwner);
    }

    function fireTransferEvents(address _from, address _to) private {
        for (uint256 i = 0; i < NUM_OPTIONS; i++) {
            emit Transfer(_from, _to, i);
        }
    }

    function mint(uint256 _optionId, address _toAddress) override public {
        // Must be sent from the owner proxy or owner.
        console.log("mint sender: %s", _msgSender());
        // ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        // require(
        //     address(proxyRegistry.proxies(owner())) == _msgSender() ||
        //         owner() == _msgSender()
        // , "Proxy registry assert failed");
        // require(canMint(_optionId), "Mint with this option id not allowed");
        
        // to accept WETH from 
        FFWClubNFT nft = FFWClubNFT(nftAddress);
        nft.mintToWithDifferentPayee(_msgSender(), _toAddress, 1);
    }

    function canMint(uint256 _optionId) override public view returns (bool) {
        if (_optionId >= NUM_OPTIONS) {
            return false;
        }

        FFWClubNFT nft = FFWClubNFT(nftAddress);
        uint256 nftSupply = nft.totalSupply();

        uint256 numItemsAllocated = 1;
        return nftSupply < (NUM_OPTIONS - numItemsAllocated);
    }

    function tokenURI(uint256 _optionId) override external view returns (string memory) {
        return string(abi.encodePacked(baseURI, Strings.toString(_optionId)));
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use transferFrom so the frontend doesn't have to worry about different method names.
     */
    function transferFrom(
        address,
        address _to,
        uint256 _tokenId
    ) public {
        mint(_tokenId, _to);
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use isApprovedForAll so the frontend doesn't have to worry about different method names.
     */
    function isApprovedForAll(address _owner, address _operator)
        public
        view
        returns (bool)
    {
        if (owner() == _owner && _owner == _operator) {
            return true;
        }

        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (
            owner() == _owner &&
            address(proxyRegistry.proxies(_owner)) == _operator
        ) {
            return true;
        }

        return false;
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use isApprovedForAll so the frontend doesn't have to worry about different method names.
     */
    function ownerOf(uint256) public view returns (address _owner) {
        return owner();
    }
}