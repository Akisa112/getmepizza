// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract GetMePizza is ERC721, Ownable {
    using SafeMath for uint256;
    // Event to emit when a Memo is created.
    event NewMemo(
        address from,
        address to,
        uint256 timestamp,
        string name,
        string message,
        uint256 amount
    );

    // Memo struct.
    struct Memo {
        address from;
        address to;
        uint256 timestamp;
        string name;
        string message;
        uint256 amount;
    }


    // Maps an address to a Memo.
    mapping (address => Memo[]) public memoForAddress;
    // Maps an address to how much they can withdraw.
    mapping (address => uint256) public creatorsPizzaMoney;

    uint256 public feePercantage = 5000;
    uint256 public fees;

    constructor() ERC721("MyToken", "MTK") {}

    /**
    * @dev Buy a pizza for the creator and mint the donator a pizza box NFT.
    * @param _name name of the creator.
    * @param _name name of the buyer.
    * @param _name name of the message left by the buyer to the creator.
    */
    function buyPizza(address to, string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Can't eat for free. :(");

        uint256 fee = msg.value.mul(feePercantage).div(10000);
        uint256 total = msg.value.sub(fee);
        fees += fee;
        
        // Add the memo to storage mapping.
        memoForAddress[msg.sender].push(Memo(
            msg.sender,
            to,
            block.timestamp, 
            _name,
            _message,
            msg.value
        ));

        creatorsPizzaMoney[to] += total;
 
        // _safeMint(msg.sender, tokenId);

        // Emit a log event when a new memo is created. 
        emit NewMemo(
            msg.sender,
            to,
            block.timestamp, 
            _name,
            _message,
            msg.value
        );
    }

    // Allows creators to withdraw tips.
    function withdrawTips() public  {
        require(creatorsPizzaMoney[msg.sender] > 0, "must have tips");
        uint256 amount = creatorsPizzaMoney[msg.sender];
        creatorsPizzaMoney[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    // Get an array of memos for a creator
    function getMemos(address _creator) public view returns(Memo[] memory) {
        return memoForAddress[_creator];
    }

    // change the fee percantage (out of 10000 basis points)
    function setFee(uint256 _newFeePercentage) external onlyOwner {
        feePercantage = _newFeePercentage;
    }
}
