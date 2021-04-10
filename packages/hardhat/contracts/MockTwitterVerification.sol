// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "./Signature.sol";

import "hardhat/console.sol";

// NOT TO BE USED IN PROD, JUST FOR TESTING
contract MockTwitterVerification {

    // Store signatures to verify them
    mapping(address => bytes) public userToSignature;
    // Store mapping between request and address to ensure address is the only one that can be verified by requestX
    mapping(bytes32 => address) public requestIdToAddress;

    mapping(address => bytes32) public verifiedHandle;

    /** DEMO METHODS, DO NOT USE IN PROD */
    function DEMOrequestTwitterVerification(bytes memory signature, uint256 tweetId) public returns (bytes32 requestId) 
    {
        console.log("From Contract DEMOrequestTwitterVerification");

        bytes32 requestId = bytes32(0);
        console.log("requestId");
        console.logBytes32(requestId);

        userToSignature[msg.sender] = signature;
        console.log("address");
        console.log(msg.sender);
        
        console.log("signature");
        console.log(string(signature));

        requestIdToAddress[requestId] = msg.sender;

        // Sends the request
        return requestId;
    }

    /**
     * Receive the response in the form of uint256
     TODO: FIGURE OUT WHAT WE GET BACK
     */ 
    function DEMOfulfillTwitterVerification(bytes32 _requestId, bytes32 _handle) public returns(bytes32)
    {   
        console.log("From Contract DEMOfulfillTwitterVerification");

        string memory parsedhandle = bytes32ToString(_handle);
        console.log("parsedhandle");
        console.log(parsedhandle);

        address userAddress = requestIdToAddress[_requestId];
        console.log("userAddress");
        console.log(userAddress);

        bytes memory signature = userToSignature[userAddress];        
        console.log("signature");
        console.log(string(signature));


        address verifiedAddress = Signature.getAddress(parsedhandle, signature);
        console.log("verifiedAddress");
        console.log(verifiedAddress);

        require(verifiedAddress == userAddress, "Address Doesn't Match");

        verifiedHandle[verifiedAddress] = _handle;
    }


    function bytes32ToString(bytes32 _bytes32) public pure returns (string memory) {
        uint8 i = 0;
        while(i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }
}