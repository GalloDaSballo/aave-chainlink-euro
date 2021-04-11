import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { useUser } from "../../context/UserContext";
import handleConnetionError from "../../utils/handleConnectionError";
import styles from "./Header.module.scss";
import { usePublishedAddress } from "../../context/IPFSContext";

const Header: React.FC = () => {
  const user = useUser();
  const { error } = useWeb3React();
  const IPFSAddress = usePublishedAddress();
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <img src="/images/logo.svg" alt="OpenSky Logo" />
        </a>
      </Link>
      {error && <>{handleConnetionError(error)}</>}
      {user && (
        <>
          Connected as: {String(user?.address).substring(0, 6)}...
          <div>
            {!IPFSAddress && (
              <Link href="/app/deploy">
                <a className={styles.actionButton}>
                  <img src="/images/upload.svg" alt="publish" /> Publish to IPFS
                </a>
              </Link>
            )}
            {IPFSAddress && (
              <a
                className={styles.actionButton}
                target="_blank"
                rel="nofollow noreferrer"
                href={`https://gateway.pinata.cloud/ipfs/${IPFSAddress}/`}
              >
                <img src="/images/preview.svg" alt="publish" /> View Your Blog
              </a>
            )}
          </div>
          <div>
            <Link href="/app/publish">
              <a className={styles.button}>Add a new Article</a>
            </Link>
          </div>
        </>
      )}
      {!user && (
        <Link href="/login">
          <a className={styles.button}>Login with Metamask</a>
        </Link>
      )}
    </header>
  );
};
export default Header;
