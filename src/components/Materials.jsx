import { usePanel } from "../PanelContext.jsx";

const colors = ["FCF7F8", "C3423F", "96FF67", "275DAD", "FDE74C"];

const Materials = () => {
  const { color, setColor } = usePanel();

  const onClick = (materialColor) => {
    setColor(materialColor);
  };

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
              onClick(materialColor);
            }}
          ></button>
        );
      })}
    </div>
  );
};

export default Materials;
