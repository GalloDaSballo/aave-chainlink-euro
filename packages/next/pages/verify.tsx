import { Contract, Signer, utils } from "ethers";
import { FormEvent, useEffect, useState } from "react";
import { useHandle } from "../context/TwitterVerificationContext";
import { useUser } from "../context/UserContext";
import styles from "../styles/Publish.module.scss";
import {
  SIGNATURE_ABI,
  SIGNATURE_ADDRESS,
  VERIFICATION_ADDRESS,
  VERIFICATION_ABI,
} from "../utils/constants";

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
  const [step, setStep] = useState(1);
  const [handle, setHandle] = useState("");
  const [signature, setSignature] = useState<string | null>(null);
  const [postId, setPostId] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const user = useUser();

  const onChainHandle = useHandle()
  console.log("onChainHandle", onChainHandle)

  const handleSignature = async (e: FormEvent) => {
    e.preventDefault();

    const signatureContract = new Contract(
      SIGNATURE_ADDRESS,
      SIGNATURE_ABI,
      user.provider
    );
    const hash = await signatureContract.getHash(String(handle).toLowerCase());
    // const fromContract = await // TODO FROM S
    const res = await getToken(user.provider.getSigner(), hash);
    setSignature(res);
  };

  const handleTweetIdVerification = async (e: FormEvent) => {
    e.preventDefault();
    if (!postId) {
      alert("Please add a TweetId");
      return;
    }
    const verificationContract = new Contract(
      VERIFICATION_ADDRESS,
      VERIFICATION_ABI,
      await user.provider.getSigner()
    );
    const res = await (
      await verificationContract.requestTwitterVerification(signature, postId)
    ).wait();
    console.log("res", res);
    setResult(res.transactionHash);
    setStep(3);
  };

  if(onChainHandle){
    return (
      <div className={styles.container}>
        <h2>You are verified! {onChainHandle}</h2>
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <h2>Verify your Twitter</h2>
      {step == 1 && (
        <>
          {!signature && (
            <>
              <p>Step 1: Type your Twitter Handle</p>
              <form onSubmit={handleSignature}>
                <label htmlFor="handle">
                  Enter your Twitter Handle
                  <input
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                  />
                </label>
                <button type="submit">Sign here</button>
              </form>
            </>
          )}

          {signature && (
            <div>
              <h3>Step 2: Publish your Signature on Twitter</h3>
              <p>{signature}</p>
              <button onClick={() => setStep(2)}>I published it</button>
            </div>
          )}
        </>
      )}

      {step === 2 && (
        <>
          <h3>
            Step 4: Paste the tweetId and then sign the initiation request
          </h3>
          <form onSubmit={handleTweetIdVerification}>
            <label htmlFor="handle">
              Enter your Twitter Post Id
              <input
                value={postId}
                onChange={(e) => setPostId(e.target.value)}
              />
            </label>
            <button type="submit">Sign here</button>
          </form>
        </>
      )}

      {step === 3 && (
        <>
          <p>Step 5: Chainlink nodes scans twitter for your Signature</p>
          <p>
            Step 6: If the signature matches with your handle and your address,
            you're verified!
          </p>
          Note this currently is broken
          <h3>Yor request hash</h3>
          <p>{result}</p>
        </>
      )}

      
    </div>
  );
};

export default VerifyAccountPage;
