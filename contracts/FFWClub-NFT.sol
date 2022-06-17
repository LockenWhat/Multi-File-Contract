// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "./common/meta-transactions/RandomlyAssigned.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

/// @title Furry Fox Woodside club NFTs 🦊
/// @custom:website furryfoxwoodside.club
/// @custom:developer github.com/VenkatTeja
contract FFWClubNFT is ERC721Tradable {
    using Strings for uint256;

    IERC20 public WETH = IERC20(0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619);
    enum SalePhase { LOCKED, EARLY_SALE, VIP_SALE, PRESALE, PUBLICSALE }
    SalePhase public phase = SalePhase.LOCKED;
    
    // merkle tree roots for whitelisting
    bytes32 public whitelistMerkleRoot; 
    bytes32 public earlyAccessMerkleRoot; 
    bytes32 public VIPAccessMerkleRoot; 
    bytes32 public airdropMerkleRoot; 

    // tracks mints per wallet in each phase
    mapping(address => uint64) public teamCounter;
    mapping(address => uint64) public airdropCounter;
    mapping(address => uint64) public earlyCounter;
    mapping(address => uint64) public vipCounter;
    mapping(address => uint64) public presaleCounter;
    mapping(address => uint64) public publicsaleCounter;

    // tracks total mints per phase
    uint64 public totalTeamCounter;
    uint64 public totalAirdropCounter;
    uint64 public totalEarlyCounter;
    uint64 public totalVIPCounter;
    uint64 public totalPresaleCounter;

    // total reserve limits
    uint64 public TOTAL_TEAM_RESERVE = 500;
    uint64 public TOTAL_AIRDROP_RESERVE = 100;
    uint64 public TOTAL_EARLY_RESERVE = 2000;
    uint64 public TOTAL_VIP_RESERVE = 2000;
    uint64 public TOTAL_PRESALE_RESERVE = 2000;

    // per wallet limits
    uint16 public MAX_PER_AIRDROP_ADDRESS = 5;
    uint16 public MAX_PER_EARLY_ADDRESS = 20;
    uint16 public MAX_PER_VIP_ADDRESS = 20;
    uint16 public MAX_PER_PRESALE_ADDRESS = 100;
    uint16 public MAX_PER_PUBLICSALE_ADDRESS = 500;


    uint64 public MAX_SUPPLY = 10000;

	uint256 public mintPrice = 0.04 ether; // change as phase is updated

    string public baseURI = ""; // to be updated with ipfs URIs

    // freeze settings once finalized
    bool public metadataIsFrozen = false;
    bool public settingsIsFrozen = false;

    bool merkleMintVerficationEnabled = true;
    bool public paused = false;
    bool public revealed = false;

    constructor(address _proxyRegistryAddress, uint64 maxSupply, address _WETH)
        ERC721Tradable("Furry Fox Woodside Club", "FFWClub", _proxyRegistryAddress)
    {
        MAX_SUPPLY = maxSupply;
        WETH = IERC20(_WETH);
    }

    
    /// Update phase and mint price together. The phase can only advance.
    /// @param _phase new phase id
    /// @param _mintPrice  new mint price in wei
    /// @custom:only-owner
    function setPhaseAndMintPrice(SalePhase _phase, uint256 _mintPrice) public onlyOwner {
        if(uint8(_phase) != uint8(phase)) // to be able to update price within same phase (for tests)
            _setPhase(_phase);
        _setMintPrice(_mintPrice);
    }

    /// @param _phase new phase id
    function _setPhase(SalePhase _phase) internal {
        require(uint8(_phase) > uint8(phase), "can only advance phases");
        phase = _phase;
    }

    /// Update mint price
    /// @param _mintPrice  new mint price in wei
    /// @custom:only-owner
    function _setMintPrice(uint256 _mintPrice) internal onlyOwner {
        mintPrice = _mintPrice;
    }

    /// Update base NFT URI
    /// @param __baseURI set ipfs url (e.g. ipfs://bafy..../out/)
    /// should point to meta files without any .json extension
    /// @custom:only-owner
    function setBaseURI(string memory __baseURI) public onlyOwner {
        require(!metadataIsFrozen, "Metadata is permanently frozen");
        baseURI = __baseURI;
    }

    /// Pause/unpause minting
    /// @custom:only-owner
    function setPaused(bool isPaused) public onlyOwner {
        paused = isPaused;
    }

    /// Update proxy registry used by open sea
    function setProxyRegistry(address proxy) public onlyOwner {
        proxyRegistryAddress = proxy;
    }
    /// Reveals NFTs
    /// @dev when true, the tokenURI returned is based on id. 
    /// when false, a static pre-reveal URL is sent for any NFT
    function revealNFTs() public onlyOwner {
        require(!revealed, "NFTs already revealed");
        revealed = true;
    }

    /// Freezes the metadata
	/// @dev sets the state of `metadataIsFrozen` to true
	/// @notice permamently freezes the metadata so that no more changes are possible
    /// @custom:only-owner
	function freezeMetadata() external onlyOwner {
		require(!metadataIsFrozen, "Metadata is already frozen");
		metadataIsFrozen = true;
	}

    /// Freezes the settings
	/// @dev sets the state of `settingsIsFrozen` to true
	/// @notice permamently freezes the limtis so that no more changes are possible
    /// @custom:only-owner
    function freezeSettings() external onlyOwner {
		require(!settingsIsFrozen, "Settings is already frozen");
		settingsIsFrozen = true;
	}
    
    /// get base URI
    // @dev overrides baseURI logic to be compatiable with our logic and opensea
    function _baseURI() internal override view virtual returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();
        string memory __baseURI = _baseURI();
        if(!revealed)
            return __baseURI;
        return bytes(__baseURI).length != 0 ? string(abi.encodePacked(__baseURI, tokenId.toString())) : "";
    }
    
    /// Supply can be reduced but cannot be increased. 
    /// Once reduced, cannot be increased again.
    /// @notice constraints: supply can only reduce up what has been minted already
    /// @custom:only-owner
    function reduceSupply(uint64 newMaxSupply) public onlyOwner {
        require(newMaxSupply >= _totalMinted(), "cannot reduce below total mint");
        require(newMaxSupply < MAX_SUPPLY, "should be < MAX SUPPLY");
        MAX_SUPPLY = newMaxSupply;
    }


    /// Switches on/off if merkle proof verification has to be done
    /// if disabled, merkle tree verification will no longer happen 
    /// and anyone will be able to mint
    /// @custom:only-owner
    function setMerkleMintVerification(bool isEnabled) public onlyOwner {
        merkleMintVerficationEnabled = isEnabled;
    }

    /// update per wallet limits and reserve limits across various phases
    /// @param airdropLimit max limit per wallet in airdrop
    /// @param earlyAccessLimit max limit per wallet in early access
    /// @param vipAccessLimit max limit per wallet in vip access
    /// @param preSaleLimit max limit per wallet in pre sale
    /// @param publicSaleLimit max limit per wallet in public sale
    /// @param totalTeamReserve max tokens allocated for team
    /// @param totalAirdropReserve max tokens allocated for airdrop
    /// @param earlyAccessReserve max tokens allocated for early access
    /// @param vipAccessReserve max tokens allocated for vip access
    /// @param totalPresaleReserve max tokens allocated for pre-sale
    /// @dev cannot be updated once settings are frozen
    /// @custom:only-owner
    function setLimits(uint16 airdropLimit, uint16 earlyAccessLimit,
        uint16 vipAccessLimit, uint16 preSaleLimit, uint16 publicSaleLimit, 
        uint64 totalTeamReserve, uint64 totalAirdropReserve, uint64 earlyAccessReserve, 
        uint64 vipAccessReserve, uint64 totalPresaleReserve) public onlyOwner {
        require(!settingsIsFrozen, "Settings are permanently frozen");
        MAX_PER_AIRDROP_ADDRESS = airdropLimit;
        MAX_PER_EARLY_ADDRESS = earlyAccessLimit;
        MAX_PER_VIP_ADDRESS = vipAccessLimit;
        MAX_PER_PRESALE_ADDRESS = preSaleLimit;
        MAX_PER_PUBLICSALE_ADDRESS = publicSaleLimit;

        TOTAL_TEAM_RESERVE = totalTeamReserve;
        TOTAL_AIRDROP_RESERVE = totalAirdropReserve;
        TOTAL_EARLY_RESERVE = earlyAccessReserve;
        TOTAL_VIP_RESERVE = vipAccessReserve;
        TOTAL_PRESALE_RESERVE = totalPresaleReserve;
    }

    /// set merkle tree roots for all phases
    // @dev single function given to save gas
    /// @custom:only-owner
    function setMerkleRoots(bytes32 _airdropRoot, bytes32 _earlyAccessRoot, bytes32 _vipAccessRoot, bytes32 _whitelistRoot) public onlyOwner {
        setAirdropMerkleRoot(_airdropRoot);
        setEarlyAccessMerkleRoot(_earlyAccessRoot);
        setVIPAccessMerkleRoot(_vipAccessRoot);
        setWhitelistMerkleRoot(_whitelistRoot);
    }

    /// set merkle tree root for airdrop
    /// @custom:only-owner
    function setAirdropMerkleRoot(bytes32 _root) public onlyOwner {
        airdropMerkleRoot = _root; 
    }  

    /// set merkle tree root for early access
    /// @custom:only-owner
    function setEarlyAccessMerkleRoot(bytes32 _root) public onlyOwner {
        earlyAccessMerkleRoot = _root; 
    }  

    /// set merkle tree root for vip access
    /// @custom:only-owner
    function setVIPAccessMerkleRoot(bytes32 _root) public onlyOwner {
        VIPAccessMerkleRoot = _root; 
    }

    /// set merkle tree root for presale
    /// @custom:only-owner
    function setWhitelistMerkleRoot(bytes32 _root) public onlyOwner {
        whitelistMerkleRoot = _root; 
    }    

    /// for a given merkleRoot and merkle, 
    /// verifies if the sender has access to mint
    function _verifyMerkleLeaf(  
        bytes32 _merkleRoot,  
        bytes32[] memory _merkleProof ) internal view returns (bool) {  
            bytes32 leaf = keccak256(abi.encodePacked(_msgSender()));
            require(MerkleProof.verify(_merkleProof, _merkleRoot, leaf), "Incorrect proof");
            return true; // Or you can mint tokens here
    }

    /// Mint reserved tokens for the team. Only Owner
    /// pass array of toAddresses and array of quantity for each address
    /// @notice constraints: 1. length of array of to address should be equal to length of counts array
    /// 2. Cannot mint beyond team reserve
    /// @custom:only-owner
    function mintToTeam(uint64[] memory counts, address[] memory toAddresses) public onlyOwner {
        require(counts.length == toAddresses.length, "counts size != toAddresses size");
        uint64 totalCount = 0;
        for(uint8 i=0; i<counts.length; ++i) {
            totalCount += counts[i];
        }
        require(totalTeamCounter + totalCount <= TOTAL_TEAM_RESERVE, "exceeding total team limit");
        totalTeamCounter += totalCount;
        for(uint8 i=0; i<counts.length; ++i) {
            _mint(toAddresses[i], counts[i]);
        }
    }

    /// The minter can pass their proof and quantity (count)
    /// and get their mints.
    /// mint open during any phase and no mint price
    /// @notice constraints: 1. Max mints/wallet limit
    /// 2. Total reserve limit
    function mintAirdrop(bytes32[] memory _merkleProof, uint64 count) public {
        require(airdropCounter[_msgSender()] + count <= MAX_PER_AIRDROP_ADDRESS, "exceeding limit per wallet");
        require(totalAirdropCounter + count <= TOTAL_AIRDROP_RESERVE, "exceeding total airdrop limit");
        airdropCounter[_msgSender()] += count;
        totalAirdropCounter += count;
        _mintWhitelist(airdropMerkleRoot, _merkleProof, count, true);
    }
    
    /// Mint during Early access phase
    /// only wallets eligible in this phase can mint if merkle mint is enabled
    /// Accepts ETH. Verifies if ETH sent >= current mint price * count 
    function mintEarlyAccessSale(bytes32[] memory _merkleProof, uint64 count) public 
        validateWEthPayment(count, _msgSender())
        payable {
        _merkleMintWrapper(earlyCounter, MAX_PER_EARLY_ADDRESS, totalEarlyCounter, TOTAL_EARLY_RESERVE,
        count, SalePhase.EARLY_SALE, _merkleProof, earlyAccessMerkleRoot);
    }

    /// Mint during VIP access phase
    /// only wallets eligible in this phase can mint if merkle mint is enabled
    /// Accepts ETH. Verifies if ETH sent >= current mint price * count 
    function mintVIPAccessSale(bytes32[] memory _merkleProof, uint64 count) public 
        validateWEthPayment(count, _msgSender())
        payable {
        _merkleMintWrapper(vipCounter, MAX_PER_VIP_ADDRESS, totalVIPCounter, TOTAL_VIP_RESERVE,
        count, SalePhase.VIP_SALE, _merkleProof, VIPAccessMerkleRoot);
    }
    
    /// Mint during PreSale phase
    /// only wallets eligible in this phase can mint if merkle mint is enabled
    /// Accepts ETH. Verifies if ETH sent >= current mint price * count 
    function mintPresale(bytes32[] memory _merkleProof, uint64 count) public 
        validateWEthPayment(count, _msgSender())
        payable {
        _merkleMintWrapper(presaleCounter, MAX_PER_PRESALE_ADDRESS, totalPresaleCounter, TOTAL_PRESALE_RESERVE,
        count, SalePhase.PRESALE, _merkleProof, whitelistMerkleRoot);
    }

    /// Internal method for common whitelist mint logic based on phase
    /// Method used for Early, VIP and Pre-sale mints
    /// Checks for the following before mint:
    /// 1. per wallet limits
    /// 2. Total reserve under the phase
    /// 3. Phase is eligible
    /// Then, Calls internal method `_mintWhitelist`
    /// if merkleMint is disabled, anyone can mint using these methods
    function _merkleMintWrapper(mapping(address => uint64) storage counter, uint16 maxPerWallet, 
        uint64 totalReserve, uint64 totalReserveLimit,
        uint64 count, SalePhase acceptedPhase, bytes32[] memory _merkleProof, bytes32 merkleRoot) internal {
        require(phase == acceptedPhase, "not in required phase");
        require(counter[_msgSender()] + count <= maxPerWallet, "exceeding limit per wallet");
        require(totalReserve + count <= totalReserveLimit, "exceeding total vip limit");
        counter[_msgSender()] += count;
        totalReserve += count;
        transferTokens(_msgSender(), mintPrice * count);
        _mintWhitelist(merkleRoot, _merkleProof, count, merkleMintVerficationEnabled);
    }

    /// Verifies proof and mints NFT
    /// if checkProof is enabled, verifies the proof
    /// Then calls internal method `_mint`
    function _mintWhitelist(bytes32 root, bytes32[] memory proof, uint64 count,
        bool checkProof) internal {
        if(checkProof)
            require(     
            _verifyMerkleLeaf(      
                root,
                proof
            ), "Invalid proof");

        _mint(_msgSender(), count);
    }

    /// Verifies supply and mints
    /// Does the following checks:
    /// 1. mint is within the max supply
    /// 2. if minting is not paused
    function _mint(address _to, uint64 quantity) internal {
        require(!paused, "Minting is paused");
        require(_totalMinted() + quantity <= MAX_SUPPLY, "Supply exceeding");
        _safeMint(_to, quantity);
    }
    
    /// Public Mint accessible to anyone once public sale phase is enabled
    /// Accepts ETH. Verifies if ETH sent >= current mint price * count 
    function mintTo(address _to, uint64 count) public
        validateWEthPayment(count, _msgSender())
        payable {
        require(phase == SalePhase.PUBLICSALE, "notfor public sale yet");
        require(publicsaleCounter[_msgSender()] + count <= MAX_PER_PUBLICSALE_ADDRESS, "exceeding max limit per wallet");
        publicsaleCounter[_msgSender()] += count;
        transferTokens(_msgSender(), mintPrice * count);
        _mint(_to, count);
    }

    // /// Mint NFTs into this contract so that 
    // /// they can be revealed and sale can be opened on opensea
    function selfMint(address to, uint64 count) public onlyOwner {
        _mint(to, count);
    }

    /// Public Mint accessible to anyone once public sale phase is enabled
    /// a different account to accept WETH is allowed
    /// Accepts ETH. Verifies if ETH sent >= current mint price * count 
    function mintToWithDifferentPayee(address wETHPayee, address _to, uint64 count) public
        validateWEthPayment(count, wETHPayee)
        payable {
        require(phase == SalePhase.PUBLICSALE, "notfor public sale yet");
        require(publicsaleCounter[_msgSender()] + count <= MAX_PER_PUBLICSALE_ADDRESS, "exceeding max limit per wallet");
        publicsaleCounter[_msgSender()] += count;
        transferTokens(wETHPayee, mintPrice * count);
        _mint(_to, count);
    }

    /// Send ETH held by contract. Only Owner.
    /// @custom:only-owner
    function disbursePayments(
		address[] memory payees_,
		uint256[] memory amounts_
	) external onlyOwner {
	    require(payees_.length == amounts_.length,
			"Payees and amounts size mismatch"
		);
		for (uint256 i; i < payees_.length; i++) {
			makePaymentTo(payees_[i], amounts_[i]);
		}
    }

    /// Send ETH held by contract. Only Owner.
    /// @custom:only-owner
    function disburseWETHPayments(
		address[] memory payees_,
		uint256[] memory amounts_
	) external onlyOwner {
	    require(payees_.length == amounts_.length,
			"Payees and amounts size mismatch"
		);
		for (uint256 i; i < payees_.length; i++) {
            WETH.approve(payees_[i], amounts_[i]);
            WETH.transfer(payees_[i], amounts_[i]);
		}
    }

    /// Make a payment
	/// @dev internal fn called by `disbursePayments` to send Ether to an address
	function makePaymentTo(address address_, uint256 amt_) private {
		(bool success, ) = address_.call{value: amt_}("");
		require(success, "Transfer failed.");
	}

    /// Modifier to validate Eth payments on payable functions
	/// @dev compares the product of the state variable `_mintPrice` and supplied `count` to msg.value
	/// @param count factor to multiply by
	modifier validateEthPayment(uint256 count) {
		require(
			mintPrice * count <= msg.value,
			"Ether value sent is not correct"
		);
        _;
	}

    /// Modifier to validate WETH payments on payable functions
	/// @dev compares the product of the state variable `_mintPrice` and supplied `count` to msg.value
	/// @param count factor to multiply by
	modifier validateWEthPayment(uint256 count, address wethSender) {
        uint256 requiredAmount = mintPrice * count;
        uint256 senderBalance = WETH.balanceOf(wethSender);
        console.log("validateWEthPayment %s, %s, %s", requiredAmount, senderBalance, wethSender);
		require(
			requiredAmount <= senderBalance,
			"Insufficient WETH"
		);
        _;
	}

    /// an NFT owner can burn their NFTs
    function burn(uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        require(owner == _msgSender(), "no permissions");
        _burn(tokenId);
    }

    /// Transfer WETH tokens into contract
    function transferTokens(address from, uint256 amount) private returns (uint256) {
        console.log("TransferTokens: %s", amount);
        uint256 initialBal = WETH.balanceOf(address(this));
        WETH.transferFrom(from, address(this), amount);
        uint256 finalBal = WETH.balanceOf(address(this));
        require((finalBal - initialBal) == amount, "Could not recieve tokens");
        return (amount);
    }
}