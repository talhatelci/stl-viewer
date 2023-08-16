import Settings3D from "./Settings3D.jsx";
import Scene3D from "./Scene3D.jsx";
import { Canvas } from "@react-three/fiber";

const Canvas3D = () => {
  return (
    <Canvas>
      <Settings3D />
      <Scene3D />
    </Canvas>
  );
};

export default Canvas3D;
