import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;

    const { deployer } = await getNamedAccounts();
    console.log("deployer", deployer);

    const signature = await hre.ethers.getContract("Signature");

    await deployments.deploy("TwitterVerification", {
        from: deployer,
        log: true,
        libraries: {
            Signature: signature.address
        }
    });
};

export default func;
