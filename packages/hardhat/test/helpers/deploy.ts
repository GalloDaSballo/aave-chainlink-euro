import { Contract, Signer } from "ethers";
import { deployments, ethers } from "hardhat";

export async function deploy(
    deploymentName: string,
    { from, args, connect, libraries }: { from?: string; args: Array<unknown>; connect?: Signer, libraries?: any },
    contractName: string = deploymentName,
): Promise<Contract> {
    // Unless overridden, deploy from named address "deployer"
    if (from === undefined) {
        const deployer = await ethers.getNamedSigner("deployer");
        // eslint-disable-next-line no-param-reassign
        from = deployer.address;
    }

    const deployment = await deployments.deploy(deploymentName, {
        from,
        contract: contractName,
        args,
        log: true,
        libraries
    });

    const instance = await ethers.getContractAt(deploymentName, deployment.address);

    return connect ? instance.connect(connect) : instance;
}
