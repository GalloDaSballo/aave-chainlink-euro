import { task } from "hardhat/config";
import { Euro } from "../typechain";

import { TASK_RATIO } from "./task-names";

task(TASK_RATIO, "Shows you the EUR / USDC Conversion", async (_taskArgs, hre) => {
    const contract = (await hre.ethers.getContract("Euro")) as Euro;
    await contract.testMint(1000);
});
