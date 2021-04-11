import Link from "next/link";
import { useBalances } from "../../context/BalanceContext";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  const { eth: ethBalance } = useBalances();
  return (
    <footer className={styles.footer}>
      {ethBalance.eq(0) && (
        <div>
          <p>
            It seems like you have no Matic,{" "}
            <a
              rel="nofollow noreferrer"
              target="_blank"
              href="https://faucet.matic.network/"
            >
              Get some free Matic
            </a>
          </p>
        </div>
      )}
      <div className={styles.footerLinks}>
      <div>
        <Link href="/app/preview">View all articles</Link>
      </div>
      <div>
        <a href="mailto:alex@entreprenerd.xyz" target="_blank" rel="nofollow noreferrer">Investor? Let's talk</a>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
