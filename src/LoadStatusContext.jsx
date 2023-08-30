import { createContext, useState, useContext, useMemo, useRef } from "react";

const LoadStatusContext = createContext();

const LoadStatusProvider = (props) => {
  /*
    Load status
    0 -> Waiting for file input
    1 -> Loading the model
    2 -> Loaded successfully
    3 -> Error
  */
  const [loadStatus, setLoadStatus] = useState(0);
  const filePath = useRef("");

  const value = useMemo(() => {
    return { loadStatus, setLoadStatus, filePath };
  }, [loadStatus]);

  return <LoadStatusContext.Provider value={value} {...props} />;
};

const useLoadStatus = () => {
  const context = useContext(LoadStatusContext);

  if (!context) {
    throw new Error(
      "This hook should be used within a LoadStatusContext provider."
    );
  }

  return context;
};

export { LoadStatusProvider, useLoadStatus };
