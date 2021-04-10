import { task } from "hardhat/config";
import { TwitterVerification } from "../typechain";

task("CheckLastHandle", "Was the signature request received by the contract?", async (_taskArgs, hre) => {
    const { ethers } = hre;
    const twitterVerification = await ethers.getContract("TwitterVerification") as TwitterVerification;

    const tx = await twitterVerification.lastHandle()
    console.log("tx", tx)
});
