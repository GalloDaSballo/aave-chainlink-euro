import mumbaiDeployment from "@opensky/hardhat/deployments/mumbai/Poster.json";

// TODO MAKE THIS WORK FOR ALL ENVIRONMENTS (or quit and just go with mumbai for hackathon)

export const DEPLOY_BLOG_URL = "http://3.94.22.221:3000";

export const EXPLORER_URL = "https://explorer-mumbai.maticvigil.com";

export const CONTRACT_ADDRESS = mumbaiDeployment.address;

export const CONTRACT_ABI = mumbaiDeployment.abi;

export const SUBGRAPH_URL = "https://thegraph.com/explorer/subgraph/gallodasballo/opensky"