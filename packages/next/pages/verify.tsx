import { Signer, utils } from "ethers";
import { FormEvent, useState } from "react";
import { useUser } from "../context/UserContext";

/**
 * Does a raw signature given a signer
 * @param signer
 * @param message
 * @returns
 */
export const getToken = async (signer: Signer, message: string) => {
  const signature = await signer.signMessage(utils.arrayify(message));
  return signature;
};

const VerifyAccountPage: React.FC = () => {
  const [handle, setHandle] = useState("");
  const [signature, setSignature] = useState<string | null>(null);
  const user = useUser();

  const handleSignature = async (e: FormEvent) => {
    e.preventDefault();
    const res = await getToken(user.provider.getSigner(), handle);
    setSignature(res);
  };
  return (
    <div>
      <h2>Verify your Twitter</h2>
      <p>Step 1: Type your Twitter Handle</p>
      <p>Step 2: Sign your Twitter Handle</p>
      <p>Step 3: Publish your Signature on Twitter</p>
      <p>Step 4: Publish the TweetId containing your signature on Twitter</p>
      <p>Step 5: Chainlink nodes scans twitter for your Signature</p>
      <p>
        Step 6: If the signature matches with your handle and your address,
        you're verified!
      </p>
      {signature && <p>{signature}</p>}
      <form onSubmit={handleSignature}>
        <input value={handle} onChange={(e) => setHandle(e.target.value)} />
        <button type="submit">Sign here</button>
      </form>
    </div>
  );
};

export default VerifyAccountPage;
