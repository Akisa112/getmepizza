// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract GetMePizza is ERC20, ERC20Burnable, Ownable, ERC20FlashMint {
    using SafeMath for uint256;
    // Event to emit when a Memo is created.
    event NewMemo(
        address from,
        address to,
        uint256 timestamp,
        string name,
        string message,
        uint256 amount,
        uint256 slices
    );

    // Memo struct.
    struct Memo {
        address from;
        address to;
        uint256 timestamp;
        string name;
        string message;
        uint256 amount;
        uint256 slices;
    }


    // Maps an address to an array of Memos.
    mapping (address => Memo[]) public memosForAddress;
    // Maps an address to how much they can withdraw.
    mapping (address => uint256) public creatorsPizzaMoney;
    // Maps a token ID to a Memo.
    mapping (uint256 => Memo) public memoForToken;

    // Percentage fee platform takes per tip.
    uint256 public feePercantage = 500; // 5%.
    // Total platform fees ever taken in.
    uint256 public PlatformFees;
    // CurrentTokenId.
    uint256 internal currentTokenId;
    // CurrentAdmin.
    address public admin;
    // Base Tip Dollar Amount
    uint256 baseDollars = 1;

    AggregatorV3Interface internal priceFeedUsd;

    constructor(address _admin) ERC20("GetMePizza", unicode"🍕") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
        admin = _admin;
    }

    /**
     * Returns the latest amount of token for $1
     */
    function getLatestPrice() public view returns (uint256) {
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeedUsd.latestRoundData();
        return 10000000000000000 / uint256(price);
    }

    /**
    * @dev Buy a pizza for the creator and mint the donator a coupon.
    * @param _to wallet address of the creator.
    * @param _name name left by the tipper.
    * @param _message name left by the tipper.
    * @param _slices name of the message left by the buyer to the creator.
    */
    function tipPizza(address _to, string memory _name, string memory _message, uint256 _slices) public payable {
        uint256 exactPrice = (getLatestPrice() * 10000000000 * _slices * baseDollars);
        // Make sure value is $1 per slice using chainlink.  
        require(msg.value > exactPrice - exactPrice.mul(2).div(100), "Costs a $1 per slice..."); // We give 2% leeway cos chainlink price updates quite fast.
        // Memo must be less than 34 characters. 
        require(bytes(_message).length < 34, "Your memo is too long");
        // Work out fee and creator tip based on amount tipped and current set feePercentage.
        uint256 fee = msg.value.mul(feePercantage).div(10000);
        uint256 creatorsTipAfterFee = msg.value.sub(fee);
        // Add fee to totalPlatform fees to track total fees ever taken.
        PlatformFees += fee;
        
        // Add the memo to the array of memo's for that creator.
        memosForAddress[_to].push(Memo(
            msg.sender,
            _to,
            block.timestamp, 
            _name,
            _message,
            msg.value,
            _slices
        ));
        // Add the creators tip amount to the mapping so they can withdraw later.
        creatorsPizzaMoney[_to] += creatorsTipAfterFee;

        // Get current Token ID.
        currentTokenId++;
        
        // Add the memo to the tokenId mapping so we can call the memo's from FE.
        memoForToken[currentTokenId] = Memo(
            msg.sender,
            _to,
            block.timestamp, 
            _name,
            _message,
            msg.value,
            _slices
        );

        // Emit a log event when a new memo is created. 
        emit NewMemo(
            msg.sender,
            _to,
            block.timestamp, 
            _name,
            _message,
            msg.value,
            _slices
        );

        // mints 1 🍕 token per slice. 
        _mint(msg.sender, 1000000000000000000 * _slices);
    }

    // CREATORS FUNCTION **
     
    // Allows creators to withdraw tips.
    function withdrawTips() public  {
        require(creatorsPizzaMoney[msg.sender] > 0, "must have tips");
        uint256 amount = creatorsPizzaMoney[msg.sender];
        creatorsPizzaMoney[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    // VIEW FUNCTION

    // Get an array of memos for a creator.
    function getMemos(address _creator) public view returns(Memo[] memory) {
        return memosForAddress[_creator];
    }


    // ADMIN FUNCTIONS **

    // change the fee percantage (out of 10000 basis points).
    function setFee(uint256 _newFeePercentage) external {
        require (msg.sender == admin, "you not the admin");
        feePercantage = _newFeePercentage;
    }

    // Allow the admin to withdraw.
    function withdrawPlatformFees() external {
        require(PlatformFees > 0, "no fees to claim atm");
        require (msg.sender == admin, "you not the admin");
        uint256 amount = PlatformFees;
        PlatformFees = 0;
        payable(admin).transfer(amount);
    }

    // Allow admin to change the Base dollar amount for a pizza slice.
    function setBaseDollars(uint256 _baseDollars) external {
        require (msg.sender == admin, "you not the admin");
        baseDollars = _baseDollars;
    }

    // Allow Adming to change PriceFeed address from chainlink.
    function setPriceFeed(AggregatorV3Interface _priceFeedUsd) external  {
        require (msg.sender == admin, "you not the admin");
        priceFeedUsd = _priceFeedUsd;
    }

    // DEPLOYER FUNCTIONS **

    // Allow deployer to change Admin.
    function setAdmin(address _admin) external onlyOwner {
        admin = _admin;
    }



    // MULTICHAIN FUNCTIONS ** 
    address public multichainaddy;

    // Allow admin to set multichain address.
    function setMultichainAddy(address _multichainaddy) external {
        require (msg.sender == admin, "you not the admin");
        multichainaddy = _multichainaddy;
    }

    function mint(address to, uint256 amount) external returns (bool) {
        require (msg.sender == multichainaddy, "this is for multichain only");
        _mint(to, amount);
        return true;
    }

    function burn(address from, uint256 amount) external returns (bool) {
        require (msg.sender == multichainaddy, "this is for multichain only");
        require(from != address(0), "AnyswapV3ERC20: address(0x0)");
        _burn(from, amount);
        return true;
    }

    address public immutable underlying = address(0);

}