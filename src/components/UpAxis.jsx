import { usePanel } from "../PanelContext.jsx";

const UpAxis = () => {
  const { upAxis, setUpAxis } = usePanel();

  const onChange = (e) => {
    setUpAxis(e.target.value);
  };

  return (
    <div className="flex gap-x-2 opacity-80">
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
  );
};

export default UpAxis;
