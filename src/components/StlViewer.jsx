import ModelForm from "./ModelForm.jsx";
import Canvas3D from "./Canvas3D.jsx";
import CloseButton from "./CloseButton.jsx";
import LoadingAnimation from "./LoadingAnimation.jsx";
import Panel from "./Panel.jsx";
import { useState, createContext, useMemo, useEffect } from "react";

export const PathContext = createContext();

const StlViewer = () => {
  const [filePath, setFilePath] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [upAxis, setUpAxis] = useState("Z");
  const [sizes, setSizes] = useState({ x: 0, y: 0, z: 0 });
  const [color, setColor] = useState("FCF7F8");

  const contextValue = useMemo(() => {
    return {
      filePath,
      setFilePath,
      loaded,
      setLoaded,
      upAxis,
      setUpAxis,
      sizes,
      setSizes,
      color,
      setColor,
    };
  }, [filePath, loaded, upAxis, sizes, color]);

  return (
    <PathContext.Provider value={contextValue}>
      <div className="w-full p-4">
        <div className="container relative mx-auto flex flex-col items-center gap-y-4 lg:flex-row lg:items-start lg:gap-x-8">
          {/* Title */}
          <h1 className="text-center text-3xl text-green-800 lg:absolute lg:bottom-0 lg:right-0 lg:text-4xl">
            Stl Viewer
          </h1>

          {/* Viewer */}
          <div className="relative aspect-square w-full border border-green-800 lg:aspect-auto lg:h-[calc(100vh-8rem)] lg:w-2/3">
            {/* Upload form */}
            <div
              className={`absolute inset-0 transition-opacity ${
                filePath ? "custom-hidden" : "custom-visible"
              }`}
            >
              <ModelForm />
            </div>

            {/* Canvas */}
            <div
              className={`absolute inset-0 transition-opacity ${
                loaded ? "custom-visible" : "custom-hidden"
              }`}
            >
              <Canvas3D />
            </div>

            {/* Close current model */}
            <div
              className={`absolute right-2 top-2 h-6 w-6 transition-opacity ${
                loaded ? "custom-visible" : "custom-hidden"
              }`}
            >
              <CloseButton />
            </div>

            {/* Loading animation */}
            <div className="pointer-events-none absolute inset-0">
              <LoadingAnimation />
            </div>
          </div>

          {/* Info Panel */}
          <div className="w-full lg:w-1/3">
            <Panel />
          </div>
        </div>
      </div>
    </PathContext.Provider>
  );
};

export default StlViewer;
