import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { useRef, useEffect, useState, useContext } from "react";
import {
  Box3,
  BufferGeometry,
  Color,
  CubeTextureLoader,
  DoubleSide,
  Vector3,
} from "three";
import { PathContext } from "./StlViewer.jsx";
import { useThree } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import { gsap } from "gsap";

const Scene3D = () => {
  const { filePath, setLoaded, upAxis, setSizes, color } =
    useContext(PathContext);
  const [stlGeometry, setStlGeometry] = useState(new BufferGeometry());
  const { camera, controls } = useThree();
  const loader = useRef(new STLLoader());

  const stlMesh = useRef(null);
  const [boundingBox, setBoundingBox] = useState(new Box3());
  const [grid, setGrid] = useState({ size: 10, cellSize: 1 });

  const axesHelper = useRef(null);

  useEffect(() => {
    if (upAxis == "Y") {
      axesHelper.current.setColors(0x0000ff, 0x00ff00, 0xff0000);
    } else {
      axesHelper.current.setColors(0x00ff00, 0x0000ff, 0xff0000);
    }
  }, [upAxis, grid]);

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
        y: Math.abs(boundingBox.max.y - boundingBox.min.y),
        z: Math.abs(boundingBox.max.z - boundingBox.min.z),
      };

      setSizes(sizes);

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

      camera.position.set(center.x, center.y, boundingBox.max.z * 2);
      controls.target = center;
    });
  }, [filePath]);

  useEffect(() => {
    let targetColor = new Color("#" + color);
    // stlMesh.current.material.color =

    let tl = gsap.to(stlMesh.current.material.color, {
      duration: 0.5,
      onUpdate: () => {
        stlMesh.current.material.color.lerp(targetColor, tl.progress());
      },
    });
  }, [color]);

  // useEffect(() => {
  //   let envmap = new CubeTextureLoader().load([
  //     "envmap/px.png",
  //     "envmap/nx.png",
  //     "envmap/py.png",
  //     "envmap/ny.png",
  //     "envmap/pz.png",
  //     "envmap/nz.png",
  //   ]);
  //   stlMesh.current.material.envMap = envmap;
  // }, []);

  // useEffect(() => {
  //   if (stlGeometry.boundingBox) {
  //     setSizes((current) => {
  //       let updated = { ...current };
  //       updated.y = current.z;
  //       updated.z = current.y;

  //       return updated;
  //     });
  //   }
  // }, [upAxis]);

  return (
    <group>
      <mesh
        geometry={stlGeometry}
        ref={stlMesh}
        rotation-x={upAxis == "Z" ? -Math.PI * 0.5 : 0}
        rotation-z={upAxis == "Z" ? -Math.PI * 0.5 : 0}
        rotation-y={upAxis == "Y" ? Math.PI * 0.5 : 0}
      >
        <meshStandardMaterial side={DoubleSide} />
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

      <axesHelper args={[grid.size * 0.5]} ref={axesHelper} />
    </group>
  );
};

export default Scene3D;
