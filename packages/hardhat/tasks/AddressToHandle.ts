import { task } from "hardhat/config";
import { TwitterVerification } from "../typechain";


task("AddressToHandle", "Given an address checks their handle")
  .addParam("address", "The address to verify")
  .setAction(async ({address}, {ethers}) => {

    const twitterVerification = await ethers.getContract("TwitterVerification") as TwitterVerification;

    const tx = await twitterVerification["verifiedHandle(address)"](await address)
    console.log("tx", tx)
});