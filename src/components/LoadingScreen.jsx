import { useLoadStatus } from "../LoadStatusContext.jsx";

const LoadingScreen = () => {
  const { loadStatus } = useLoadStatus();

  return (
    <div
      className={`absolute inset-0 z-40 flex items-center justify-center bg-gray-200 transition ${
        loadStatus == 1 ? "custom-visible" : "custom-hidden"
      }`}
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-800 border-l-transparent border-r-transparent"></div>
    </div>
  );
};

export default LoadingScreen;
