import mumbaiDeployment from "@opensky/hardhat/deployments/mumbai/Poster.json";
import signature from "@opensky/hardhat/deployments/mumbai/Signature.json";
import verification from "@opensky/hardhat/deployments/mumbai/TwitterVerification.json";

// TODO MAKE THIS WORK FOR ALL ENVIRONMENTS (or quit and just go with mumbai for hackathon)

export const DEPLOY_BLOG_URL =
  "https://opensky-deploy-ipfs-docker.herokuapp.com/";

export const EXPLORER_URL = "https://explorer-mumbai.maticvigil.com";

export const CONTRACT_ADDRESS = mumbaiDeployment.address;

export const CONTRACT_ABI = mumbaiDeployment.abi;

export const SUBGRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/gallodasballo/opensky";

export const SIGNATURE_ADDRESS = signature.address;
export const SIGNATURE_ABI = signature.abi;

export const VERIFICATION_ADDRESS = verification.address;
export const VERIFICATION_ABI = verification.abi;
