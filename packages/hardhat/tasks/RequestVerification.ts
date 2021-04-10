import { task } from "hardhat/config";
import { Signature, TwitterVerification } from "../typechain";

task("RequestVerification", "Sends a faux verification request using admin account", async (_taskArgs, hre) => {
    const { ethers } = hre;

    const twitterVerification = await ethers.getContract("TwitterVerification") as TwitterVerification;
    console.log("Address to sign" , await twitterVerification.signer.getAddress())
    const signature = await ethers.getContract("Signature") as Signature;
    

    const hashToSign = await signature.getHash("handle")
    const signedMessage = await twitterVerification.signer.signMessage(ethers.utils.arrayify(hashToSign))

    const tx = await(await twitterVerification["requestTwitterVerification(bytes,string)"](signedMessage, "123")).wait()
    console.log("tx", tx)
});
