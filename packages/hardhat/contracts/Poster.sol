// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

import "hardhat/console.sol";

contract Poster {
    event NewPost(address indexed author, string title, string content, string imageHash);

    function publish(string memory title, string memory content, string memory imageHash) public {
        emit NewPost(msg.sender, title, content, imageHash);
    }
}
