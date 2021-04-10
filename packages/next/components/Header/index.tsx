import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { useUser } from "../../context/UserContext";
import handleConnetionError from "../../utils/handleConnectionError";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const user = useUser();
  const { chainId, error } = useWeb3React();

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
          Connected as: {user?.address} - Network: {chainId}
          <div>
            <Link href="/app/deploy">
              <a>TODO: If not deployed, show deploy button</a>
            </Link>
          </div>
          <div>
            <Link href="/app/publish">
              <a className={styles.button}>Add a new Article</a>
            </Link>
          </div>
          <div>
            <Link href="/app/preview">
              <a>Preview a Blog</a>
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
