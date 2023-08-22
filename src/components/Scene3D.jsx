import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { useRef, useEffect, useState, useContext } from "react";
import { Box3, BufferGeometry, DoubleSide, Vector3 } from "three";
import { PathContext } from "./StlViewer.jsx";
import { useThree } from "@react-three/fiber";
import { Grid } from "@react-three/drei";

const Scene3D = () => {
  const { filePath, setLoaded, upAxis } = useContext(PathContext);
  const [stlGeometry, setStlGeometry] = useState(new BufferGeometry());
  const { camera, controls } = useThree();
  const loader = useRef(new STLLoader());

  const stlMesh = useRef(null);
  const [boundingBox, setBoundingBox] = useState(new Box3());
  const [grid, setGrid] = useState({ size: 10, cellSize: 1 });

  useEffect(() => {
    if (!filePath) {
      return;
    }

    loader.current.load(filePath, (geometry) => {
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
        y: Math.abs(boundingBox.max.z - boundingBox.min.z),
        z: Math.abs(boundingBox.max.y - boundingBox.min.y),
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

  useEffect(() => {
    console.log("UpAxis: ", upAxis);
    console.log(stlGeometry);
  }, [upAxis]);

  return (
    <group>
      <mesh
        geometry={stlGeometry}
        ref={stlMesh}
        rotation-x={upAxis == "Z" ? -Math.PI * 0.5 : 0}
        rotation-z={upAxis == "Z" ? -Math.PI * 0.5 : 0}
        rotation-y={upAxis == "Y" ? Math.PI * 0.5 : 0}
      >
        <meshNormalMaterial side={DoubleSide} />
      </mesh>
      {/* <box3Helper box={boundingBox} /> */}

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
