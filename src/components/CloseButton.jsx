import { useLoadStatus } from "../LoadStatusContext";
import { usePanel } from "../PanelContext";

const CloseButton = () => {
  const { loadStatus, setLoadStatus, filePath } = useLoadStatus();
  const { resetPanel } = usePanel();

  const onClick = () => {
    setLoadStatus(0);
    filePath.current = "";

    resetPanel();
  };

  return (
    <div
      className={`absolute right-2 top-2 z-30 h-6 w-6 transition ${
        loadStatus == 2 ? "custom-visible" : "custom-hidden"
      }`}
    >
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
    </div>
  );
};

export default CloseButton;
