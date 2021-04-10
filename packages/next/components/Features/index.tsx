import styles from "./Features.module.scss";

const Features: React.FC = () => (
  <div className={styles.features}>
    <div>
      <h2>Login with Metamask</h2>
    </div>
    <div className={styles.separator}>
      <img src="/images/arrows.svg" alt="separator" />
    </div>
    <div>
      <h2>Write your content on Matic</h2>
    </div>
    <div className={styles.separator}>
      <img src="/images/arrows.svg" alt="separator" />
    </div>
    <div>
      <h2>Preview your articles</h2>
    </div>
    <div className={styles.separator}>
      <img src="/images/arrows.svg" alt="separator" />
    </div>
    <div>
      <h2>Deploy to IPFS with one click</h2>
    </div>
  </div>
);
export default Features;
