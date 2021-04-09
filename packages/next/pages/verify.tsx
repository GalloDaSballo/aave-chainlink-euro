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
      {signature && <p>{signature}</p>}
      <form onSubmit={handleSignature}>
        <input value={handle} onChange={(e) => setHandle(e.target.value)} />
        <button type="submit">Sign here</button>
      </form>
    </div>
  );
};

export default VerifyAccountPage;
