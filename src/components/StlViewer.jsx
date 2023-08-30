import { LoadStatusProvider } from "../LoadStatusContext.jsx";
import { PanelProvider } from "../PanelContext.jsx";
import Title from "./Title.jsx";
import Viewer from "./Viewer.jsx";
import Panel from "./Panel.jsx";

const StlViewer = () => {
  return (
    <LoadStatusProvider>
      <PanelProvider>
        <div className="relative h-full w-full">
          <div className="container relative mx-auto flex flex-col items-center gap-y-4 px-4 lg:flex-row lg:items-start lg:gap-x-8 lg:px-0">
            <Title />
            <Viewer />
            <Panel />
          </div>
        </div>
      </PanelProvider>
    </LoadStatusProvider>
  );
};

export default StlViewer;
