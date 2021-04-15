import { Contract, Signer } from "ethers";
import {
  createContext,
  useEffect,
  useContext,
  useState,
  useCallback,
} from "react";
import { VERIFICATION_ABI, VERIFICATION_ADDRESS } from "../utils/constants";
import { useUser } from "./UserContext";

type TwitterVerificationContextData = {
  handle: string | null;
};

const TwitterVerificationContext = createContext<TwitterVerificationContextData>(
  {
    handle: null,
  }
);
export default TwitterVerificationContext;

const useVerifiedHandle = (signer: Signer): string | null => {
  const [handle, setHandle] = useState<string | null>(null);

  const fetchHandle = useCallback(async () => {
    try {
      const verificationContract = new Contract(
        VERIFICATION_ADDRESS,
        VERIFICATION_ABI,
        signer
      );
      const onChain = await verificationContract.verifiedHandle(
        await signer.getAddress()
      );
      if (onChain) {
        setHandle(onChain);
      }
    } catch (err) {}
  }, [signer]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchHandle();
    }, 3000);
    return () => clearInterval(interval);
  }, [fetchHandle]);

  return handle;
};

export const TwitterVerificationContextProvider: React.FC = ({ children }) => {
  const user = useUser();
  const handle = useVerifiedHandle(user?.provider?.getSigner());

  return (
    <TwitterVerificationContext.Provider
      value={{
        handle,
      }}
    >
      {children}
    </TwitterVerificationContext.Provider>
  );
};

export const useHandle = (): string | null => {
  const { handle } = useContext(TwitterVerificationContext);
  return handle;
};
