import UpAxis from "./UpAxis.jsx";
import Sizes from "./Sizes.jsx";
import { PathContext } from "./StlViewer.jsx";
import { useContext } from "react";
import PanelSection from "./PanelSection.jsx";
import Material from "./Material.jsx";

const Panel = () => {
  const { loaded } = useContext(PathContext);

  return (
    <div
      className={`flex w-full flex-col gap-y-8 border border-green-800 p-4 text-green-900 ${
        loaded
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-50"
      }`}
    >
      <PanelSection name="UpAxis">
        <UpAxis />
      </PanelSection>

      <PanelSection name="Sizes">
        <Sizes />
      </PanelSection>

      <PanelSection name="Material">
        <Material />
      </PanelSection>
    </div>
  );
};

export default Panel;
