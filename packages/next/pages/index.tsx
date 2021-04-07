import Head from "next/head";
import Link from "next/link";
import Features from "../components/Features";
import Login from "../components/Login";
import { useUser } from "../context/UserContext";
import styles from "../styles/Home.module.scss";

const HomePage: React.FC = () => {
  const user = useUser();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Start your decentralized blog</h1>
      <Features />
      {!user && (
        <Link href="/login">
          <a>Login with Metamask</a>
        </Link>
      )}
      {user && (
        <div>
          <p>TODO: Check if user has already deployed</p>
          <Link href="/app/deploy">
            <a>Deploy your blog</a>
          </Link>
          <p>Publish a new Post</p>
          <Link href="/app/deploy">
            <a>Deploy your blog</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
