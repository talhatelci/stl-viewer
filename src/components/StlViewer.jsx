import ModelForm from "./ModelForm.jsx";
import Canvas3D from "./Canvas3D.jsx";
import { useState } from "react";

const StlViewer = () => {
  const [modelPath, setModelPath] = useState(null);
  const [loaded, setLoaded] = useState(false);

  return (
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
              loaded ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <ModelForm setModelPath={setModelPath} />
          </div>

          {/* Canvas */}
          <div
            className={`absolute inset-0 transition-opacity ${
              loaded ? "opacity-100" : "pointer-events-none -z-50 opacity-0"
            }`}
          >
            <Canvas3D modelPath={modelPath} setLoaded={setLoaded} />
          </div>
        </div>

        {/* Info */}
        <div className="h-64 w-full border border-green-800"></div>
      </div>
    </div>
  );
};

export default StlViewer;
