import Settings3D from "./Settings3D.jsx";
import Scene3D from "./Scene3D.jsx";
import { Canvas } from "@react-three/fiber";

const Canvas3D = ({ modelPath, setLoaded }) => {
  return (
    <Canvas>
      <Settings3D />
      <Scene3D modelPath={modelPath} setLoaded={setLoaded} />
    </Canvas>
  );
};

export default Canvas3D;
