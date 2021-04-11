import { createContext, useContext } from "react";
import useHasPublishedToIPFS from "../hooks/useHasPublishedToIPFS";

type IPFSContextData = {
  addressPublished: string | null;
  updatePublished: (hash: string) => void;
};

const IPFSContext = createContext<IPFSContextData>({
  addressPublished: null,
  updatePublished: () => null,
});
export default IPFSContext;

export const IPFSContextProvider: React.FC = ({ children }) => {
  const [published, setPublished] = useHasPublishedToIPFS();

  return (
    <IPFSContext.Provider
      value={{
        addressPublished: published,
        updatePublished: setPublished,
      }}
    >
      {children}
    </IPFSContext.Provider>
  );
};

export const usePublishedAddress = () => {
  const { addressPublished } = useContext(IPFSContext);

  return addressPublished;
};

export const useSetPublishedAddress = () => {
  const { updatePublished } = useContext(IPFSContext);

  return updatePublished;
};
