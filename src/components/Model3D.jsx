import { usePanel } from "../PanelContext.jsx";
import { Color, DoubleSide } from "three";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Model3D = ({ geometry }) => {
  const { upAxis, color } = usePanel();
  const stlMesh = useRef(null);

  useEffect(() => {
    if (!stlMesh.current) {
      return;
    }

    let targetColor = new Color("#" + color);

    let tl = gsap.to(stlMesh.current.material.color, {
      duration: 0.5,
      onUpdate: () => {
        stlMesh.current.material.color.lerp(targetColor, tl.progress());
      },
    });
  }, [color]);

  return (
    <group>
      {geometry && (
        <mesh
          geometry={geometry}
          ref={stlMesh}
          rotation-x={upAxis == "Z" ? -Math.PI * 0.5 : 0}
          rotation-z={upAxis == "Z" ? -Math.PI * 0.5 : 0}
          rotation-y={upAxis == "Y" ? Math.PI * 0.5 : 0}
        >
          <meshStandardMaterial side={DoubleSide} envMapIntensity={1.2} />
        </mesh>
      )}
    </group>
  );
};

export default Model3D;
