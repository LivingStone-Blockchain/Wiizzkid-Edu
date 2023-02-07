// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

interface STToken {
 function transfer(address,uint) external returns (bool);
 function transferFrom(address,address,uint) external returns (bool);
 function balanceOf(address tokenOwner) external view returns (uint balance);
}

contract GameLogic is ReentrancyGuard, Ownable {

    STToken public stToken;

    constructor (address _stToken) {
        stToken = STToken(_stToken);
    }

    function createGame(uint256 _betAmount) public payable{
        require(_betAmount <= stToken.balanceOf(msg.sender), "You do not have sufficient tokens");
        require(_betAmount > 0, "Bet Amount cannot be Zero");

        stToken.transferFrom(msg.sender, address(this), _betAmount);
    }

    function joinGame(uint256 _betAmount) public payable{
        require(_betAmount <= stToken.balanceOf(msg.sender), "You do not have sufficient tokens");
        require(_betAmount > 0, "Bet Amount cannot be Zero");

        stToken.transferFrom(msg.sender, address(this), _betAmount);
    }

    function withdrawWins(uint256 winningAmount) public payable{
        stToken.transfer( msg.sender, winningAmount);
    }

    function withdrawTokens() public onlyOwner payable{
        address _owner = owner();
        stToken.transfer(_owner, stToken.balanceOf(address(this)));
    }

    receive() external payable {}

    fallback() external payable {}
}