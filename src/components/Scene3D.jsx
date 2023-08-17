import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { useRef, useEffect, useState, useContext } from "react";
import { BufferGeometry, Vector3 } from "three";
import { PathContext } from "./StlViewer.jsx";
import { useThree } from "@react-three/fiber";

const Scene3D = () => {
  const { filePath, setLoaded } = useContext(PathContext);
  const [stlGeometry, setStlGeometry] = useState(new BufferGeometry());
  const { camera, controls } = useThree();
  const loader = useRef(new STLLoader());

  useEffect(() => {
    if (!filePath) {
      return;
    }

    loader.current.load(filePath, (geometry) => {
      setStlGeometry(geometry);
      setTimeout(() => {
        setLoaded(true);
      }, 500);
      camera.position.set(5, 5, 5);
      controls.target = new Vector3();
    });
  }, [filePath]);

  return (
    <group>
      <mesh geometry={stlGeometry}>
        <meshNormalMaterial />
      </mesh>
    </group>
  );
};

export default Scene3D;
