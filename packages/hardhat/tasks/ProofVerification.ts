import { task } from "hardhat/config";
import { TwitterVerification } from "../typechain";

task("ProofVerification", "Verifies the admin handle status", async (_taskArgs, hre) => {
    const { ethers } = hre;
    const twitterVerification = await ethers.getContract("TwitterVerification") as TwitterVerification;

    const tx = await twitterVerification["verifiedHandle(address)"](await twitterVerification.signer.getAddress())
    console.log("tx", tx)
});
