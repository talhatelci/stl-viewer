import PanelSection from "./PanelSection.jsx";
import UpAxis from "./UpAxis.jsx";
import Sizes from "./Sizes.jsx";
import Materials from "./Materials.jsx";
import { useLoadStatus } from "../LoadStatusContext.jsx";

const Panel = () => {
  const { loadStatus } = useLoadStatus();

  return (
    <div
      className={`flex w-full flex-col gap-y-8 border border-green-800 p-4 text-green-900 lg:w-1/3 ${
        loadStatus == 2
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
        <Materials />
      </PanelSection>
    </div>
  );
};

export default Panel;
