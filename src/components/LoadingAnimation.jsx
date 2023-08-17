import { PathContext } from "./StlViewer";
import { useContext, useState, useEffect } from "react";

const LoadingAnimation = () => {
  const { filePath, loaded } = useContext(PathContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (filePath) {
      setVisible(true);
    }

    if (loaded) {
      setVisible(false);
    }
  }, [filePath, loaded]);

  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gray-200 transition ${
        visible ? "custom-visible" : "custom-hidden"
      }`}
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-800 border-l-transparent border-r-transparent"></div>
    </div>
  );
};

export default LoadingAnimation;
