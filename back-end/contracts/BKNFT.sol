// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IWhitelist.sol";

contract BkNFT is ERC721,Ownable{

    string _baseTokenURI;

    bool public presaleStarted;

    uint256 public presaleEnded;

    uint256 public maxTokens = 20;

    uint256 public numTokens;

    mapping(uint=>bool) public tokenIsMinted;

    IWhitelist whitelist;

    constructor(string memory baseURI,address whitelistcontract) ERC721("Bamoun's king NFT","BkNFT"){
          
        _baseTokenURI=baseURI;
        whitelist=IWhitelist(whitelistcontract);
    }

    function startPresale() public onlyOwner{    
        presaleEnded=block.timestamp + 5 minutes;
        presaleStarted=true;
    }

    function presaleMint(uint256 _price,uint256 _id) public payable{
         uint256 price = (_price) * (1 ether);
         require(presaleStarted && block.timestamp<presaleEnded,"Presale has'nt start yet");
         require(whitelist.whitelistAddresses(msg.sender),"you have to be in whitelist");
         require(numTokens<maxTokens,"Max Token are minted");
         require(msg.value>=price,"Insufficiant funds");
         require(!tokenIsMinted[_id],"Token already Minted");
         _safeMint(msg.sender,_id);
         numTokens+=1;
         tokenIsMinted[_id]=true;
    }
    
    function publicMint(uint256 _price,uint256 _id) public payable{
        uint256 price = (_price)*(1 ether);
        require(presaleStarted && block.timestamp>=presaleEnded,"public sale has'nt start");
        require(numTokens<maxTokens,"Max Token are Minted");
        require(msg.value>=price,"Insufficiant funds");
        _safeMint(msg.sender,_id);
        numTokens+=1;
        tokenIsMinted[_id]=true;
    }

    function _baseURI() internal view virtual override returns (string memory) {
          return _baseTokenURI;
    }

    function withdraw() public onlyOwner  {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) =  _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
    
    receive() external payable {}
    fallback() external payable {}
}