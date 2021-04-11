import Head from "next/head";
import Link from "next/link";
import Benefits from "../components/Benefits";
import Features from "../components/Features";
import styles from "../styles/Home.module.scss";

const HomePage: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>Open Sky - Build and Launch your Decentralized Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Start your decentralized blog</h1>
      <Features />
      <img src="/images/main-image.jpg" alt="Start your blog!" />

      <Benefits />

      <div className={styles.verify}>
        <h3>Verify your twitter with Chainlink</h3>
        <p>Bring your clout by verifying your twitter account with Chainlink</p>
        <Link href="/verify">
          <a className={styles.button}>Verify your Twitter</a>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
