import { createContext, useContext, useMemo, useState } from "react";

const PanelContext = createContext();

const PanelProvider = (props) => {
  const [upAxis, setUpAxis] = useState("Z");
  const [sizes, setSizes] = useState({ x: 0, y: 0, z: 0 });
  const [color, setColor] = useState("FCF7F8");

  const resetPanel = () => {
    setUpAxis("Z");
    setSizes({ x: 0, y: 0, z: 0 });
    setColor("FCF7F8");
  };

  const value = useMemo(() => {
    return {
      upAxis,
      setUpAxis,
      sizes,
      setSizes,
      color,
      setColor,
      resetPanel,
    };
  }, [upAxis, sizes, color]);

  return <PanelContext.Provider value={value} {...props} />;
};

const usePanel = () => {
  const context = useContext(PanelContext);

  if (!context) {
    throw new Error("This hook should be used within a PanelContext provider.");
  }

  return context;
};

export { PanelProvider, usePanel };
