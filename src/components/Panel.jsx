import UpAxis from "./UpAxis.jsx";
import { PathContext } from "./StlViewer.jsx";
import { useContext } from "react";

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
      <UpAxis />
    </div>
  );
};

export default Panel;
