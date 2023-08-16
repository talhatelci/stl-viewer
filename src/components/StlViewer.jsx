import ModelForm from "./ModelForm.jsx";
import Canvas3D from "./Canvas3D.jsx";
import CloseButton from "./CloseButton.jsx";
import { useState, createContext, useMemo, useEffect } from "react";

export const PathContext = createContext();

const StlViewer = () => {
  const [filePath, setFilePath] = useState(null);

  useEffect(() => {
    // console.log("File Path: ", filePath);
    // console.log("Type: ", typeof filePath);
  }, [filePath]);

  const contextValue = useMemo(() => {
    return {
      filePath,
      setFilePath,
    };
  });

  return (
    <PathContext.Provider value={contextValue}>
      <div className="w-full p-4">
        <div className="container relative mx-auto flex flex-col items-center gap-y-4 lg:flex-row lg:items-start lg:gap-x-8">
          {/* Title */}
          <h1 className="text-center text-3xl text-green-800 lg:absolute lg:bottom-0 lg:right-0 lg:text-4xl">
            Stl Viewer
          </h1>

          {/* Viewer */}
          <div className="relative aspect-square w-full border border-green-800">
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
              className={`absolute inset-0 bg-red-100 transition-opacity ${
                filePath ? "custom-visible" : "custom-hidden"
              }`}
            >
              <Canvas3D />
            </div>

            {/* Close current model */}
            <div
              className={`absolute right-2 top-2 h-6 w-6 transition-opacity ${
                filePath ? "custom-visible" : "custom-hidden"
              }`}
            >
              <CloseButton />
            </div>
          </div>

          {/* Info */}
          <div className="h-64 w-full border border-green-800"></div>
        </div>
      </div>
    </PathContext.Provider>
  );
};

export default StlViewer;
