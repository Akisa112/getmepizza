// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import './Base64.sol';

contract GetMePizza is ERC721, Ownable {
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
    uint256 public totalPlatformFees;
    // CurrentTokenId.
    uint256 internal currentTokenId;

    constructor() ERC721("PizzaBoxes", "PIZZA") {}

    /**
    * @dev Buy a pizza for the creator and mint the donator a receipt as NFT.
    * @param _to wallet address of the creator.
    * @param _name name left by the tipper.
    * @param _message name left by the tipper.
    * @param _slices name of the message left by the buyer to the creator.
    * @param _receipt bool as minting the receipt NFT is optional.
    */
    function buyPizza(address _to, string memory _name, string memory _message, uint256 _slices, bool _receipt) public payable {
        // Make sure value is more than 0.
        require(msg.value > 0, "Can't eat for free. :(");
        // Work out fee and creator tip based on amount tipped and current set feePercentage.
        uint256 fee = msg.value.mul(feePercantage).div(10000);
        uint256 creatorsTipAfterFee = msg.value.sub(fee);
        // Add fee to totalPlatform fees to track total fees ever taken.
        totalPlatformFees += fee;
        
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

        // mint receipt as onchain NFT (optional for tipper). 
        if (_receipt) {
            _safeMint(msg.sender, currentTokenId);
        }
        

        // Add the memo to the tokenId mapping for the NFT.
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
    }

    // Allows creators to withdraw tips.
    function withdrawTips() public  {
        require(creatorsPizzaMoney[msg.sender] > 0, "must have tips");
        uint256 amount = creatorsPizzaMoney[msg.sender];
        creatorsPizzaMoney[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    // Get an array of memos for a creator.
    function getMemos(address _creator) public view returns(Memo[] memory) {
        return memosForAddress[_creator];
    }

    // change the fee percantage (out of 10000 basis points).
    function setFee(uint256 _newFeePercentage) external onlyOwner {
        feePercantage = _newFeePercentage;
    }

    
    /**
    * @dev gets the onchain SVG for a tokenID from the Memo struct from memoForToken mapping.
    * @param _tokenId the token ID being requested.
    */
    function getReceiptSvg(uint256 _tokenId) public view returns(string memory) {
        // get the Memo struct for _tokenId.
        Memo memory currentMemo = memoForToken[_tokenId];
        
        // format the amounts to Strings.
        string memory totalAmount = Strings.toString(currentMemo.amount);
        string memory fee = Strings.toString(currentMemo.amount.mul(feePercantage).div(10000));
        string memory creatorsTipAfterFee = Strings.toString(currentMemo.amount.sub(currentMemo.amount.mul(feePercantage).div(10000)));
        
        // Build the SVG.
        string memory result = string(abi.encodePacked(    
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 290.95 451.518"><defs><filter id="a" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="4.552"/></filter></defs><path style="filter:url(#a);fill:#4d4d4d" d="M297.37 300.94h269.1v429.67h-269.1z" transform="translate(-286.45 -290.01)"/><path style="fill:#fff" d="M299.51 304.75h269.1v429.67h-269.1z" transform="translate(-286.45 -290.01)"/>'
            '<text style="font-size:30px;letter-spacing:0;word-spacing:0;line-height:125%;fill:#707070" xml:space="preserve" y="365.242" x="315.868" transform="translate(-231.45 -300.01)"><tspan x="315.868" style="fill:#707070" y="372.242">GETME.',unicode"🍕",'</tspan></text>'
            '<text style="font-size:9px;letter-spacing:0;word-spacing:0;line-height:125%;fill:#707070" xml:space="preserve" y="365.242" x="315.868" transform="translate(-243.45 -282.01)"><tspan x="315.868" style="fill:#707070" y="374.242">YOUR FAV DIGITAL PIZZA HOUSE</tspan></text>'
            '<text style="font-size:7px;letter-spacing:0;word-spacing:0;line-height:125%;fill:#707070" xml:space="preserve" y="365.242" x="315.868" transform="translate(-243.45 -258.01)"><tspan x="315.868" style="fill:#707070" y="375.242">CHK: ',Strings.toString(_tokenId),'</tspan></text>'
            '<text style="font-size:7px;letter-spacing:0;word-spacing:0;line-height:125%;fill:#707070" xml:space="preserve" y="365.242" x="315.868" transform="translate(-243.45 -258.01)"><tspan x="315.868" style="fill:#707070" y="385.242">',Strings.toString(currentMemo.timestamp),'</tspan></text>'
            '<text style="font-size:7px;letter-spacing:0;word-spacing:0;line-height:125%;fill:#707070" xml:space="preserve" y="365.242" x="315.868" transform="translate(-243.45 -258.01)"><tspan x="315.868" style="fill:#707070" y="395.242">NAME: ',currentMemo.name,'</tspan></text>'
            '<text style="font-size:13.109px;letter-spacing:0;line-height:125%;word-spacing:0;fill:#707188" xml:space="preserve" y="328.534" x="311.919" transform="translate(-246.45 -288.01)">'
                '<tspan x="313.919" y="394.441">--------------------------</tspan>'
                '<tspan x="311.919" y="454.712">Article</tspan>'
                '<tspan x="425.919" y="454.712">Amount</tspan>'
                '<tspan x="311.919" y="458.348">______</tspan>'
                '<tspan x="425.919" y="458.348">_______</tspan>'
                '<tspan x="311.919" y="488.619">Pizza Slices</tspan>'
                '<tspan x="423.09" y="488.619">x ',Strings.toString(currentMemo.slices),'</tspan>'
                '<tspan x="310.4" y="510.891">---------------------------</tspan>'
                '<tspan x="311.919" y="538.526">GROSS</tspan>'
                '<tspan x="421.919" y="538.526" style="font-size:4px">',creatorsTipAfterFee,'</tspan>'
                '<tspan x="311.919" y="560.162">TAX (',Strings.toString(feePercantage / 100),'%)</tspan>'
                '<tspan x="421.919" y="560.162" style="font-size:4px">',fee,'</tspan>'
                '<tspan x="310.4" y="580.891">---------------------------</tspan>'
                '<tspan x="311.919" y="603.797">TOTAL</tspan>'
                '<tspan x="421.919" y="603.797" style="font-size:4px">',totalAmount,'</tspan>'
                '<tspan x="320.6" y="625.619" style="font-size:5px">TO: ',toAsciiString(currentMemo.to),'</tspan>'
                '<tspan x="312.6" y="635.619" style="font-size:5px">FROM: ',toAsciiString(currentMemo.from),'</tspan>'
                '<tspan x="312.6" style="font-size:5px" y="665.619">YOUR MEMO: ',currentMemo.message,'</tspan>'
            '</text></svg>'
            ));

        return result;
    }
        
        
    /**
    * @dev Overrides the tokenURI function to return the onchain URI for a tokenId.
    * @param tokenId the token ID being requested.
    */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId));
        return
            string(
                abi.encodePacked(
                    'data:application/json;base64,',
                    Base64.encode(
                        bytes(
                            string(
                                abi.encodePacked(
                                    '{"name": "GetMe.Pizza Receipt", "description": "This is a GetMe.Pizza receipt", "image": "data:image/svg+xml;base64,',
                                    Base64.encode(bytes(getReceiptSvg(tokenId))),
                                    '","attributes":',
                                    ""
                                    '}'
                                )
                            )
                        )
                    )
                )
            );
    }

    /**
    * @dev Takes in an address and returns the address as a string.
    * @param x the address you want to convert.
    */
    function toAsciiString(address x) internal pure returns (string memory) {
    bytes memory s = new bytes(40);
    for (uint i = 0; i < 20; i++) {
        bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
        bytes1 hi = bytes1(uint8(b) / 16);
        bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
        s[2*i] = char(hi);
        s[2*i+1] = char(lo);            
    }
    return string(s);
}
    // Being used above to convert Bytes.
    function char(bytes1 b) internal pure returns (bytes1 c) {
    if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
    else return bytes1(uint8(b) + 0x57);
}
    
}
