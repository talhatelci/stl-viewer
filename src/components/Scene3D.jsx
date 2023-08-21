import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { useRef, useEffect, useState, useContext } from "react";
import { Box3, BufferGeometry, DoubleSide, Vector3 } from "three";
import { PathContext } from "./StlViewer.jsx";
import { useThree } from "@react-three/fiber";
import { Grid } from "@react-three/drei";

const Scene3D = () => {
  const { filePath, setLoaded } = useContext(PathContext);
  const [stlGeometry, setStlGeometry] = useState(new BufferGeometry());
  const { camera, controls } = useThree();
  const loader = useRef(new STLLoader());

  const stlMesh = useRef(null);
  const [boundingBox, setBoundingBox] = useState(new Box3());
  const [upAxis, setUpAxis] = useState("y");
  const [grid, setGrid] = useState({ size: 10, cellSize: 1 });

  useEffect(() => {
    if (!filePath) {
      return;
    }

    loader.current.load(filePath, (geometry) => {
      if (upAxis == "z") {
        geometry.rotateX(-Math.PI * 0.5);
      }
      setStlGeometry(geometry);

      setTimeout(() => {
        setLoaded(true);
      }, 500);

      geometry.computeBoundingBox();
      let boundingBox = geometry.boundingBox;
      setBoundingBox(boundingBox);

      let center = new Vector3();
      boundingBox.getCenter(center);

      let sizes = {
        x: Math.abs(boundingBox.max.x - boundingBox.min.x),
        y: Math.abs(boundingBox.max.y - boundingBox.min.y),
        z: Math.abs(boundingBox.max.z - boundingBox.min.z),
      };

      let min = Math.min(sizes.x, sizes.z);
      let max = Math.max(sizes.x, sizes.z);

      // Cell size
      let cs = Math.pow(10, Math.floor(Math.log10(min)));

      // Grid Size
      let gs = Math.ceil((max * 2) / cs);
      gs += gs % 2;
      gs *= cs;
      gs = parseFloat(gs.toFixed(1));

      setGrid({ size: gs, cellSize: cs / gs });

      console.log("Size: ", max, " CellSize: ", cs, " GridSize: ", gs);

      camera.position.set(center.x, center.y, boundingBox.max.z * 2);
      controls.target = center;
    });
  }, [filePath]);

  // useEffect(() => {
  //   [0.7, 1.5, 5.6, 16.6, 24.5, 67, 125.21, 211.5, 524.8, 1059.4].map(
  //     (size) => {
  //       let cs = Math.pow(10, Math.floor(Math.log10(size)));

  //       // let gs = size * 2;
  //       // let cn = Math.ceil(gs / cs);
  //       // cn = cn % 2 != 0 ? cn + 1 : cn;
  //       // cn *= cs;
  //       // cn = parseFloat(cn.toFixed(1));

  //       let gs = Math.ceil((size * 2) / cs);
  //       gs += gs % 2;
  //       gs *= cs;
  //       gs = parseFloat(gs.toFixed(1));

  //       console.log("Size: ", size, " CellSize: ", cs, " GridSize: ", gs);
  //     }
  //   );
  // }, []);

  return (
    <group>
      <mesh geometry={stlGeometry} ref={stlMesh}>
        <meshNormalMaterial side={DoubleSide} />
      </mesh>
      <box3Helper box={boundingBox} />

      <Grid
        scale={grid.size}
        sectionSize={1}
        cellSize={grid.cellSize}
        sectionThickness={0}
        cellThickness={0.5}
        side={DoubleSide}
        fadeStrength={0}
        fadeDistance={1000}
      />
      {/* 
      <mesh rotation-x={-Math.PI * 0.5}>
        <planeGeometry args={[10, 10]} />
        <meshNormalMaterial />
      </mesh> */}

      <axesHelper args={[grid.size * 0.5]} />
    </group>
  );
};

export default Scene3D;
