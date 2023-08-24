import UpAxis from "./UpAxis.jsx";
import Sizes from "./Sizes.jsx";
import { PathContext } from "./StlViewer.jsx";
import { useContext } from "react";
import PanelSection from "./PanelSection.jsx";

const Panel = () => {
  const { loaded } = useContext(PathContext);

  return (
    <div
      className={`absolute inset-4 flex flex-col gap-y-4 text-green-900 ${
        loaded
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-50"
      }`}
    >
      <PanelSection name={"UpAxis"}>
        <UpAxis />
      </PanelSection>

      <PanelSection name={"Sizes"}>
        <Sizes />
      </PanelSection>
    </div>
  );
};

export default Panel;
