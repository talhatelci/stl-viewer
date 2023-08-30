import { usePanel } from "../PanelContext.jsx";
import { Grid } from "@react-three/drei";
import { DoubleSide, Vector3 } from "three";
import { useEffect, useState, useRef } from "react";

const Grid3D = ({ boundingBox }) => {
  const { upAxis } = usePanel();
  const axesHelper = useRef(null);

  const [sizes, setSizes] = useState({ grid: 10, cell: 1 });

  useEffect(() => {
    if (!boundingBox) {
      return;
    }

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

    setSizes({ grid: gs, cell: cs / gs });
  }, [boundingBox]);

  useEffect(() => {
    if (upAxis == "Y") {
      axesHelper.current.setColors(0x0000ff, 0x00ff00, 0xff0000);
    } else {
      axesHelper.current.setColors(0x00ff00, 0x0000ff, 0xff0000);
    }
  }, [upAxis, sizes]);

  return (
    <>
      <Grid
        scale={sizes.grid}
        sectionSize={1}
        cellSize={sizes.cell}
        sectionThickness={0}
        cellThickness={0.5}
        side={DoubleSide}
        fadeStrength={0}
        fadeDistance={1000}
      />

      <axesHelper args={[sizes.grid * 0.5]} ref={axesHelper} />
    </>
  );
};

export default Grid3D;
