import { PathContext } from "./StlViewer.jsx";
import { useContext } from "react";

const CloseButton = () => {
  const { setFilePath, setLoaded, setUpAxis, setSizes } =
    useContext(PathContext);

  const onClick = () => {
    setFilePath(null);
    setLoaded(false);
    setUpAxis("Z");
    setSizes({ x: 0, y: 0, z: 0 });
  };

  return (
    <button
      className="group h-full w-full cursor-pointer border border-red-500 transition hover:scale-110"
      onClick={onClick}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="block h-full w-full"
      >
        <path
          d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
          className="fill-none stroke-red-500 transition group-hover:fill-red-500"
        />
      </svg>
    </button>
  );
};

export default CloseButton;
