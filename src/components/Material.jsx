import { PathContext } from "./StlViewer.jsx";
import { useContext } from "react";

const colors = ["FCF7F8", "C3423F", "96FF67", "275DAD", "FDE74C"];

const Material = () => {
  const { color, setColor } = useContext(PathContext);

  return (
    <div className="flex items-center gap-x-2">
      {colors.map((materialColor) => {
        return (
          <button
            key={materialColor}
            className={`h-6 w-6 cursor-pointer rounded-full transition hover:scale-110 ${
              materialColor == color ? "scale-110 border border-gray-950" : ""
            }`}
            style={{ backgroundColor: `#${materialColor}` }}
            onClick={() => {
              setColor(materialColor);
            }}
          ></button>
        );
      })}
    </div>
  );
};

export default Material;
