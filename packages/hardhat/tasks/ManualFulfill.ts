import { task } from "hardhat/config";
import { TwitterVerification } from "../typechain";

task("ManualFulfill", "Manually Verify one address", async (_taskArgs, hre) => {
    const { ethers } = hre;
    const twitterVerification = await ethers.getContract("TwitterVerification") as TwitterVerification;

    const tx = await twitterVerification["fulfill(bytes32,bytes32)"]("0x0000000000000000000000000000000000000000000000000000000000000000", ethers.utils.formatBytes32String("test_alex"))
    console.log("tx", tx)
});