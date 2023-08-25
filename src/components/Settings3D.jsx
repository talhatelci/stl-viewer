import { OrbitControls, Environment } from "@react-three/drei";
import { Perf } from "r3f-perf";

const Settings3D = () => {
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
