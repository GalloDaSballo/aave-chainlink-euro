import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;

    const { deployer } = await getNamedAccounts();

    const isTest = hre.network.name === "localhost";
    console.log("isTest", isTest);

    await deployments.deploy("Euro", {
        from: deployer,
        args: ["0xe22da380ee6b445bb8273c81944adeb6e8450422", "0x252C017036b144A812b53BC122d0E67cBB451aD4"],
        log: true,
    });
};

export default func;
