import { task } from "hardhat/config";
import { TwitterVerification } from "../typechain";

task("RequestIdToAddress", "Was the signature request received by the contract?", async (_taskArgs, hre) => {
    const { ethers } = hre;
    const twitterVerification = await ethers.getContract("TwitterVerification") as TwitterVerification;

    const tx = await twitterVerification["requestIdToAddress(bytes32)"]("0xb4da3ac494cb76b92ce2c6c182e841cf3d40805aea339832dfe047cb6060af22")
    console.log("tx", tx)
});
