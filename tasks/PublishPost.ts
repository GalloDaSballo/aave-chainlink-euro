import { task } from "hardhat/config";
import { text } from "./text";

task("PublishPost", "Prints the list of accounts", async (_taskArgs, hre) => {
    const { getNamedAccounts, ethers } = hre;

    const { deployer } = await getNamedAccounts();
    console.log("deployer", deployer);
    const poster = await ethers.getContract("Poster");
    const tx = await poster.publish(
        "Random wikipedia article",
        text,
        "https://lh3.googleusercontent.com/9QT8EDg2SmlEmmAk7i0BS8MWG72A3suhCv2MWGr3NCnbQanKcV_EiDik1J4ksjU8tKJyzbY2yt7wyCaxvL-afgiA92g0ooS7zBc-=s250",
    );
    console.log("tx", tx);
});
