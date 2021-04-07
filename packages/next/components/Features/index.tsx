import styles from "./Features.module.scss";

const Features: React.FC = () => (
  <div className={styles.container}>
    <div>
      <h2>Login with Metamask</h2>
    </div>
    <div>
      <h2>Write your content on Matic</h2>
    </div>
    <div>
      <h2>Preview</h2>
    </div>
    <div>
      <h2>Deploy your own blog to IPFS, with one click</h2>
    </div>
  </div>
);
export default Features;
