import { usePanel } from "../PanelContext.jsx";

const Sizes = () => {
  const { sizes } = usePanel();

  return (
    <div className="flex gap-x-2 opacity-80">
      <p className="text-red-500">X: {sizes.x.toFixed(2)}</p>
      <p className="text-green-600">Y: {sizes.y.toFixed(2)}</p>
      <p className="text-blue-500">Z: {sizes.z.toFixed(2)}</p>
    </div>
  );
};

export default Sizes;
