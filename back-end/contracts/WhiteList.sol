pragma solidity 0.8.9;

contract Whitelist{
    uint public maxWhitelistedAddresses;
    uint public numWhitelistAddresses;
    mapping (address=>bool) public whitelistAddresses;
    
    constructor(uint _maxwhitelistAdresses){
        maxWhitelistedAddresses=_maxwhitelistAdresses;
    }

    function addAddress() public{
        require(!whitelistAddresses[msg.sender],"Your are already whitelist");
        require(numWhitelistAddresses<maxWhitelistedAddresses,"The maximum number are already attempt");
        whitelistAddresses[msg.sender]=true;
        numWhitelistAddresses+=1;
    }
}