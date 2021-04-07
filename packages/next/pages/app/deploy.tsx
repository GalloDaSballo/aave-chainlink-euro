import Head from "next/head";
import { useCallback, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import styles from "../../styles/Home.module.scss";
import { DEPLOY_BLOG_URL } from "../../utils/constants";

const HomePage: React.FC = () => {
  const user = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  // const [hasOnboarded, updatedOnboard] = useHasOnboarded(); // Todo, using localStorage and real contract
  const [message, setMessage] = useState<string | null>(null);

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
      setMessage(`Deployed to IPFS: ${res.data}`);
    } catch (err) {
      setMessage(`Somethign went wrong, ${err.message ? err.message : err}`);
    }
    setLoading(false);
  }, [user]);

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

      <h3>
        Step 1: Get some Matic
        <a
          rel="nofollow noreferrer"
          target="_blank"
          href="https://faucet.matic.network/"
        >
          Get some matic
        </a>
      </h3>

      <h3>Step 2: Deploy your blog to IPFS</h3>
      {message && <p>{message}</p>}
      <button type="button" disabled={loading} onClick={handleBlogDeploy}>
        {loading ? "Deploying to IPFS!" : "Deploy your blog"}
      </button>
    </div>
  );
};

export default HomePage;
