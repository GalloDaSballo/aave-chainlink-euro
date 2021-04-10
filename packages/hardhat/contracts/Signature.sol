pragma solidity 0.6.12;

// Credits: https://programtheblockchain.com/posts/2018/02/17/signing-and-verifying-messages-in-ethereum/
// Credits: https://docs.openzeppelin.com/contracts/2.x/utilities#cryptography
// Credits: The legendary Austing Griffith: https://github.com/austintgriffith/scaffold-eth/blob/signature-recover/packages/hardhat/contracts/YourContract.sol
// Credits: This issue: https://github.com/ethers-io/ethers.js/issues/468#issuecomment-475990764

import "@openzeppelin/contracts/cryptography/ECDSA.sol";

library Signature {
    using ECDSA for bytes32;

    /**
     * Given the original message, returns it's hash
     */
    function getHash(string memory message) public view returns (bytes32) {
      return keccak256(abi.encode(message));
    }

    /**
     * Get signer address
     */
    function recover(bytes32 hash, bytes memory signature) public pure returns (address) {
      return hash.toEthSignedMessageHash().recover(signature);
    }

    function getAddress(string memory message, bytes memory signature) public view returns (address) {
        bytes32 hash = getHash(message);
        address signer = recover(hash, signature);
        return signer;
    }
}
