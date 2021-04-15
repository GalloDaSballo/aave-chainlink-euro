import { HardhatUserConfig } from "hardhat/config";
import { NetworkUserConfig, HardhatNetworkAccountsUserConfig } from "hardhat/types";
import { ChainId, infuraApiKey, mnemonic } from "./config";

// Import tasks here
import "./tasks/PublishPost.ts";
import "./tasks/RequestVerification";
import "./tasks/ProofVerification";
import "./tasks/CheckSignature";
import "./tasks/RequestIdToAddress";
import "./tasks/CheckLastHandle";
import "./tasks/ManualFulfill";
import "./tasks/AddressToHandle";

import "hardhat-deploy";
// To make hardhat-waffle compatible with hardhat-deploy
// we have aliased hardhat-ethers to hardhat-ethers-deploy in package.json
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-gas-reporter";
import "hardhat-typechain";
import "solidity-coverage";

function createTestnetConfig(network: keyof typeof ChainId): NetworkUserConfig {
    const url = `https://${network}.infura.io/v3/${infuraApiKey}`;
    return {
        accounts: {
            count: 10,
            initialIndex: 0,
            mnemonic,
            path: "m/44'/60'/0'/0",
        },
        chainId: ChainId[network],
        url,
    };
}

/**
 * @dev You must have a `.env` file. Follow the example in `.env.example`.
 * @param {string} network The name of the testnet
 */
function createMaticNetworkConfig(
    url: string,
): { accounts: HardhatNetworkAccountsUserConfig; url: string | undefined } {
    if (!process.env.MNEMONIC) {
        throw new Error("Please set your MNEMONIC in a .env file");
    }

    return {
        accounts: {
            count: 10,
            initialIndex: 0,
            mnemonic: process.env.MNEMONIC,
            path: "m/44'/60'/0'/0",
        },
        url,
    };
}

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    namedAccounts: {
        deployer: 0, // Do not use this account for testing
        admin: 1,
    },
    networks: {
        hardhat: {
            chainId: ChainId.hardhat,
            saveDeployments: false,
        },
        goerli: createTestnetConfig("goerli"),
        kovan: createTestnetConfig("kovan"),
        rinkeby: createTestnetConfig("rinkeby"),
        ropsten: createTestnetConfig("ropsten"),
        matic: {
            ...createMaticNetworkConfig("https://rpc-mainnet.matic.network/"),
            chainId: 137,
            gasPrice: 1e9, // 1 gwei
        },
        mumbai: {
            ...createMaticNetworkConfig("https://rpc-mumbai.maticvigil.com/"),
            chainId: 80001,
            gasPrice: 1e9, // 1 gwei
        },
    },
    paths: {
        artifacts: "./artifacts",
        cache: "./cache",
        sources: "./contracts",
        tests: "./test",
    },
    solidity: {
        version: "0.6.12",
        settings: {
            // https://hardhat.org/hardhat-network/#solidity-optimizer-support
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    typechain: {
        outDir: "typechain",
        target: "ethers-v5",
    },
    gasReporter: {
        currency: "USD",
        gasPrice: 100,
        excludeContracts: ["Mock", "ERC20"],
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY
    }
};

export default config;
