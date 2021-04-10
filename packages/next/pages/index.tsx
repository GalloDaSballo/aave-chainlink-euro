import Head from "next/head";
import Benefits from "../components/Benefits";
import Features from "../components/Features";
import styles from "../styles/Home.module.scss";

const HomePage: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Start your decentralized blog</h1>
      <Features />
      <img src="/images/main-image.jpg" alt="Start your blog!" />

      <Benefits />
    </div>
  );
};

export default HomePage;
