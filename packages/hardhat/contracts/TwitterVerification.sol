// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "./Signature.sol";

import "hardhat/console.sol";

contract TwitterVerification is ChainlinkClient {

    event BeginVerification(address indexed initiator, bytes signature, bytes32 requestId);
    event ConfirmVerification(address indexed initiator, bytes32 verifiedHandle, bytes32 requestId);


    // Store signatures to verify them
    mapping(address => bytes) public userToSignature;

    // Store mapping between request and address to ensure address is the only one that can be verified by requestX
    mapping(bytes32 => address) public requestIdToAddress;

    // Mapping of user addresses and their verified handle
    mapping(address => string) public verifiedHandle;


    /** ChainLink  */
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    bytes32 public lastHandle; // For testing
    
    /**
     * Network: Mumbai
     * Link: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Oracle: 0x6bF79E7DB8E5dFCE785B607Dd4aDfe83389AE0C8
     * Job ID: 4de0eea31b9a41c5b960e0e0429d258d
     * Fee: 0.1 LINK
     */
    constructor() public {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB); // Mumbai Link
        oracle = 0x6bF79E7DB8E5dFCE785B607Dd4aDfe83389AE0C8; // Mumbai Oracle
        jobId = "4de0eea31b9a41c5b960e0e0429d258d";
        fee = 0.1 * 10 ** 18; // 0.1 LINK 
    }

    
    function requestTwitterVerification(bytes memory signature, string memory tweetId) public returns (bytes32 requestId) 
    {
        userToSignature[msg.sender] = signature;
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        request.add("tweetId", tweetId);

        bytes32 requestId = sendChainlinkRequestTo(oracle, request, fee);
        requestIdToAddress[requestId] = msg.sender;

        emit BeginVerification(msg.sender, signature, requestId);
    }
    
    /**
     * Receive the response in the form of uint256
     */ 
    function fulfill(bytes32 _requestId, bytes32 _handle) public recordChainlinkFulfillment(_requestId)
    {   
        // // Parse Handle
        string memory parsedhandle = bytes32ToString(_handle);

        // // Given request get UserAddress and Signature
        address userAddress = requestIdToAddress[_requestId];
        bytes memory signature = userToSignature[userAddress]; 

        // // Verify who could sign such a message
        address verifiedAddress = Signature.getAddress(parsedhandle, signature);


        require(verifiedAddress == userAddress, "Address Doesn't Match");

        verifiedHandle[verifiedAddress] = bytes32ToString(_handle);

        emit ConfirmVerification(userAddress, _handle, _requestId);
    }

    // Convert Bytes to String, see https://ethereum.stackexchange.com/questions/2519/how-to-convert-a-bytes32-to-string
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