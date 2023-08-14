import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { useEffect, useState } from "react";
import { BufferGeometry } from "three";

const Scene3D = ({ modelPath, setLoaded }) => {
  const [stlGeometry, setStlGeometry] = useState(new BufferGeometry());

  useEffect(() => {
    if (!modelPath) {
      return;
    }

    let loader = new STLLoader();
    loader.load(modelPath, (geometry) => {
      setStlGeometry(geometry);
      setLoaded(true);
    });
  }, [modelPath]);

  return (
    <group>
      <mesh geometry={stlGeometry}>
        <meshNormalMaterial />
      </mesh>
    </group>
  );
};

export default Scene3D;
