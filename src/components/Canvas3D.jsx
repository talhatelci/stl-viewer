import { useLoadStatus } from "../LoadStatusContext.jsx";
import { usePanel } from "../PanelContext.jsx";
import Settings3D from "./Settings3D.jsx";
import Grid3D from "./Grid3D.jsx";
import Model3D from "./Model3D.jsx";
import { Canvas } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { useEffect, useState, useRef } from "react";

const Canvas3D = () => {
  const { loadStatus, setLoadStatus, filePath } = useLoadStatus();
  const { setSizes } = usePanel();

  const loader = useRef(new STLLoader());
  const [stlGeometry, setStlGeometry] = useState(null);
  const [boundingBox, setBoundingBox] = useState(null);

  useEffect(() => {
    if (loadStatus != 1) {
      return;
    }

    if (!filePath.current) {
      return;
    }

    loader.current.load(filePath.current, (geometry) => {
      setStlGeometry(geometry);

      setTimeout(() => {
        setLoadStatus(2);
      }, 500);

      geometry.computeBoundingBox();
      let boundingBox = geometry.boundingBox;
      setBoundingBox(boundingBox);

      let sizes = {
        x: Math.abs(boundingBox.max.x - boundingBox.min.x),
        y: Math.abs(boundingBox.max.y - boundingBox.min.y),
        z: Math.abs(boundingBox.max.z - boundingBox.min.z),
      };
      setSizes(sizes);
    });
  }, [loadStatus]);

  return (
    <div
      className={`absolute inset-0 ${
        loadStatus == 2 ? "custom-visible" : "custom-hidden"
      }`}
    >
      <Canvas>
        <Settings3D boundingBox={boundingBox} />
        <Grid3D boundingBox={boundingBox} />
        <Model3D geometry={stlGeometry} />
      </Canvas>
    </div>
  );
};

export default Canvas3D;
