import { EXPLORER_URL } from "./constants";

const fromTxToExplorerUrl = (txHash: string): string =>
  `${EXPLORER_URL}/tx/${txHash}`;

export default fromTxToExplorerUrl;
