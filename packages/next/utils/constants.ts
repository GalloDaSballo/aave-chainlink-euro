import mumbaiDeployment from "@pandoracms/hardhat/deployments/mumbai/Poster.json";

// TODO MAKE THIS WORK FOR ALL ENVIRONMENTS

export const DEPLOY_BLOG_URL = "http://52.23.151.149:3000";

export const EXPLORER_URL = "https://explorer-mumbai.maticvigil.com";

export const CONTRACT_ADDRESS = mumbaiDeployment.address;

export const CONTRACT_ABI = mumbaiDeployment.abi;
