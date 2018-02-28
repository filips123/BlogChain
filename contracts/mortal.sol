pragma solidity ^0.4.17;

contract mortal {
    /* Define variable owner of the type address */
    address public owner;

    /* This function is executed at initialization and sets the owner of the contract */
    function mortal() public { owner = msg.sender; }
    
    /* Restricted to owner */
    modifier restricted { require(msg.sender == owner); _; }
    
    /* Function to recover the funds on the contract */
    function kill() restricted public { selfdestruct(owner); }
    
    /* Function to transfer ownership */
    function transfer(address _newOwner) restricted public { owner = _newOwner; }
}