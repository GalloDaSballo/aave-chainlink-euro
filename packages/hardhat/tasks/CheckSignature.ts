import { task } from "hardhat/config";
import { TwitterVerification } from "../typechain";

task("CheckSignature", "Was the signature request received by the contract?", async (_taskArgs, hre) => {
    const { ethers } = hre;
    const twitterVerification = await ethers.getContract("TwitterVerification") as TwitterVerification;

    const tx = await twitterVerification["userToSignature(address)"](await twitterVerification.signer.getAddress())
    console.log("tx", tx)
});
