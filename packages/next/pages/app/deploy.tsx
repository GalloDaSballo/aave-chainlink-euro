import Head from "next/head";
import { useCallback, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import styles from "../../styles/Home.module.scss";
import { DEPLOY_BLOG_URL } from "../../utils/constants";
import {
  usePublishedAddress,
  useSetPublishedAddress,
} from "../../context/IPFSContext";

const DeployPage: React.FC = () => {
  const user = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  // const [hasOnboarded, updatedOnboard] = useHasOnboarded(); // Todo, using localStorage and real contract
  const [message, setMessage] = useState<string | null>(null);

  const setPublisedIPFSAddress = useSetPublishedAddress();

  const IPFSAddress = usePublishedAddress();

  const handleBlogDeploy = useCallback(async () => {
    try {
      if (!user) {
        setMessage("Please login first");
        return;
      }

      setLoading(true);
      setMessage("Building your React app and deploying it to IPFS");
      const res = await axios({
        method: "POST",
        url: DEPLOY_BLOG_URL,
        data: {
          address: user.address,
        },
      });
      setMessage(`Deployed to IPFS: ${res.data?.hash?.[0]}`);
      setPublisedIPFSAddress(res.data?.hash?.[0]);
    } catch (err) {
      setMessage(`Somethign went wrong, ${err.message ? err.message : err}`);
    }
    setLoading(false);
  }, [user, setPublisedIPFSAddress]);

  if (!user) {
    return <div>Please login first</div>;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Deploy your blog</h1>

      {/* Todo onboarded warning */}
      {/* {hasOnboarded && (
        <p>
          It seems like you already onboarded, are you sure you want to
          re-deploy?
        </p>
      )} */}
      {!IPFSAddress && (
        <>
          <h3>Deploy your blog to IPFS</h3>
          <p>Click this button and wait for the deployment to complete</p>
          {message && <p>{message}</p>}
          <button
            className={styles.deployButton}
            type="button"
            disabled={loading}
            onClick={handleBlogDeploy}
          >
            {loading ? "Deploying to IPFS!" : "Deploy your blog"}
          </button>
        </>
      )}
      {IPFSAddress && (
        <>
          <h3>Your Blog is Live!</h3>
          <a
            className={styles.actionButtonFull}
            target="_blank"
            rel="nofollow noreferrer"
            href={`https://gateway.pinata.cloud/ipfs/${IPFSAddress}/`}
          >
            <img src="/images/preview.svg" alt="publish" /> View Your Blog
          </a>
        </>
      )}
    </div>
  );
};

export default DeployPage;
