import styles from "./Benefits.module.scss";

const BENEFITS = [
  {
    title: "Chainlink verification",
    content:
      "Verify your account with Chainlink and Twitter, bring your clout on chain!",
  },
  {
    title: "Post directly on Matic",
    content:
      "Images and your blog are hosted on IPFS The content you write is posted directly on Matic, an Ethereum Layer 2, this makes it persistent and uncensorable",
  },
  {
    title: "Get started in seconds!",
    content: "Deploy your new blog to IPFS with just one click!",
  },
];

const Benefits: React.FC = () => {
  return (
    <div className={styles.benefits}>
      {BENEFITS.map((benefit) => (
        <div key={benefit.title}>
          <div className={styles.square} />
          <h3>{benefit.title}</h3>
          <p>{benefit.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Benefits;
