/**
 * It's from IPFS if it starts with Qm and has a total of 46 chars
 * @param string
 * @returns
 */
const isIPFS = (string: string) =>
  string.length === 46 && string.indexOf("Qm") === 0;

/**
 * Given a imageHash returns either a gateway url or the url
 * @param hash
 * @returns
 */
const fromImageHashToUrl = (hash?: string): string => {
  if (hash) {
    return isIPFS(hash) ? `https://gateway.pinata.cloud/ipfs/${hash}` : hash;
  }
  return "/vercel.svg";
};

export default fromImageHashToUrl;
