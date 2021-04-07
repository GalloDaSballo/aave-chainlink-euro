import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { useUser } from "../../context/UserContext";
import handleConnetionError from "../../utils/handleConnectionError";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const user = useUser();
  const { chainId, error } = useWeb3React();

  if (error) {
    return (
      <header className={styles.header}>{handleConnetionError(error)}</header>
    );
  }
  if (user) {
    return (
      <header className={styles.header}>
        <Link href="/">
          <a>HOME</a>
        </Link>
        Connected as: {user.address} - Network: {chainId}
        <div>
          <Link href="/app/deploy">
            <a>TODO: If not deployed, show deploy button</a>
          </Link>
        </div>
        <div>
          <Link href="/app/publish">
            <a>TODO: If deployed, show publish button</a>
          </Link>
        </div>
        <div>
          <Link href="/app/preview">
            <a>TODO: Preview Page</a>
          </Link>
        </div>
      </header>
    );
  }

  return <header className={styles.header} />;
};
export default Header;
