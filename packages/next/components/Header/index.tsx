import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { useLogin, useUser } from "../../context/UserContext";
import handleConnetionError from "../../utils/handleConnectionError";
import styles from "./Header.module.scss";
import { usePublishedAddress } from "../../context/IPFSContext";

const Header: React.FC = () => {
  const user = useUser();
  const { error } = useWeb3React();
  const IPFSAddress = usePublishedAddress();

  const login = useLogin();
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <img src="/images/logo.svg" alt="OpenSky Logo" />
        </a>
      </Link>
      {error && <span>{handleConnetionError(error)}</span>}
      {user && (
        <>
          <div className={styles.commands}>
            Connected as: {String(user?.address).substring(0, 6)}...
            <div>
              {!IPFSAddress && (
                <Link href="/app/deploy">
                  <a className={styles.actionButton}>
                    <img src="/images/upload.svg" alt="publish" /> Publish to
                    IPFS
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
          </div>
        </>
      )}
      {!user && (
        <button type="button" onClick={() => login()} className={styles.button}>
          Login with Metamask
        </button>
      )}
    </header>
  );
};
export default Header;
