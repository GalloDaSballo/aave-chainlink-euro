import mumbaiDeployment from "../deployments/mumbai/Poster.json";
/** All the vars, some of them injectable */
const MATIC_RPC =
    process.env.NEXT_PUBLIC_MATIC_RPC || "https://rpc-mainnet.matic.network";

const MATIC_CHAIN_ID = 137;

const MUMBAI_CHAIN_ID = 80001;
const MUMBAI_RPC =
    process.env.NEXT_PUBLIC_MUMBAI_RPC || "https://rpc-mumbai.matic.today";

const MUMBAI_EXPLORER_URL = "https://explorer-mumbai.maticvigil.com";

/** TODO */
export const MUMBAI_CONTRACT_ADDR = mumbaiDeployment.address;
const MUMBAI_THE_GRAPH_URL =
    "https://api.thegraph.com/subgraphs/name/gallodasballo/poster";
export const POSTER_ABI = mumbaiDeployment.abi;

/** Set them into settings objects */
const devSettings = {
    RPC: MUMBAI_RPC,
    CHAIN_ID: MUMBAI_CHAIN_ID,
    GRAPH_URL: MUMBAI_THE_GRAPH_URL,
    CONTRACT_ADDRESS: MUMBAI_CONTRACT_ADDR,
    CONTRACT_ABI: POSTER_ABI,
    EXPLORER_URL: MUMBAI_EXPLORER_URL,
};

const prodSettings = {
    RPC: MATIC_RPC,
    CHAIN_ID: MATIC_CHAIN_ID,

    GRAPH_URL: "TODO",
    CONTRACT_ADDRESS: "TODO",
    CONTRACT_ABI: "TODO",
    EXPLORER_URL: "TODO",
};

const prod = false; // Always in dev

export const RPC = prod ? prodSettings.RPC : devSettings.RPC;
export const CHAIN_ID = prod ? prodSettings.CHAIN_ID : devSettings.CHAIN_ID;
export const GRAPH_URL = prod ? prodSettings.GRAPH_URL : devSettings.GRAPH_URL;
export const CONTRACT_ADDRESS = prod
    ? prodSettings.GRAPH_URL
    : devSettings.CONTRACT_ADDRESS;
export const CONTRACT_ABI = prod
    ? prodSettings.GRAPH_URL
    : devSettings.CONTRACT_ABI;

export const EXPLORER_URL = prod
    ? prodSettings.EXPLORER_URL
    : devSettings.EXPLORER_URL;
