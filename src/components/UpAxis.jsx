import { PathContext } from "./StlViewer.jsx";
import { useContext } from "react";

const UpAxis = () => {
  const { upAxis, setUpAxis } = useContext(PathContext);

  const onChange = (e) => {
    setUpAxis(e.target.value);
  };

  return (
    <div>
      {/* Up Axis */}
      <div className="flex gap-x-4 border border-red-500">
        <p>Up Axis:</p>

        <div>
          <label htmlFor="Y" className="cursor-pointer pr-1">
            Y
          </label>
          <input
            type="radio"
            name="upAxis"
            id="Y"
            value="Y"
            className="cursor-pointer"
            onChange={onChange}
            checked={upAxis == "Y"}
          />
        </div>

        <div>
          <label htmlFor="Z" className="cursor-pointer pr-1">
            Z
          </label>
          <input
            type="radio"
            name="upAxis"
            id="Z"
            value="Z"
            className="cursor-pointer"
            onChange={onChange}
            checked={upAxis == "Z"}
          />
        </div>
      </div>
    </div>
  );
};

export default UpAxis;
