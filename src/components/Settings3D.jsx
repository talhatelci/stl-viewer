import { Perf } from "r3f-perf";
import { OrbitControls, Environment } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useEffect, useRef } from "react";

const Settings3D = ({ boundingBox }) => {
  const { camera, controls } = useThree();

  useEffect(() => {
    if (!boundingBox) {
      return;
    }

    let center = new Vector3();
    boundingBox.getCenter(center);

    camera.position.copy(
      new Vector3(center.x, center.z, center.y).multiplyScalar(4)
    );
    controls.target = new Vector3(center.x, center.z, center.y);
  }, [boundingBox]);

  return (
    <>
      {/* <Perf position="top-left" /> */}
      <OrbitControls makeDefault />

      <Environment
        files={[
          "envmap/px.png",
          "envmap/nx.png",
          "envmap/py.png",
          "envmap/ny.png",
          "envmap/pz.png",
          "envmap/nz.png",
        ]}
      />

      <ambientLight intensity={0.3} />
    </>
  );
};

export default Settings3D;
