import { Contract, Signer } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./constants";
/**
 * Given a provider and string values, publish them to chain
 * @param provider
 * @param title
 * @param content
 * @param imageURI
 */
const publishNewPost = async (
  signer: Signer,
  title: string,
  content: string,
  imageURI: string
): Promise<string> => {
  const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  // Gas estimate seems to break with big strings
  const gasEstimate = await contract.estimateGas.publish(
    title,
    content,
    imageURI
  );

  const tx = await contract.publish(title, content, imageURI, {
    gasLimit: gasEstimate.mul(3),
  }); // 3 times the estimate
  await tx.wait();
  return tx.hash;
};

export default publishNewPost;
