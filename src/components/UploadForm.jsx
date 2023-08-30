import { useLoadStatus } from "../LoadStatusContext.jsx";
import { useRef } from "react";

const UploadForm = () => {
  const fileInput = useRef(null);
  const { loadStatus, setLoadStatus, filePath } = useLoadStatus();

  const checkInput = () => {
    let path = fileInput.current.value;
    if (path.slice(-4) != ".stl") {
      setLoadStatus(3);
      filePath.current = "";
      return;
    }

    let url = URL.createObjectURL(fileInput.current.files[0]);
    filePath.current = url;
    setLoadStatus(1);
  };

  const loadExampleModel = (e) => {
    e.preventDefault();
    filePath.current = "teapot.stl";
    setLoadStatus(1);
  };

  return (
    <div
      className={`absolute inset-0 z-50 flex flex-col items-center justify-center transition ${
        loadStatus == 0 || loadStatus == 3 ? "custom-visible" : "custom-hidden"
      }`}
    >
      <label
        htmlFor="stl"
        className="text-md cursor-pointer bg-green-800 p-4 text-white transition hover:bg-green-900 lg:text-xl"
        onChange={checkInput}
      >
        Upload Stl Model
        <input
          ref={fileInput}
          type="file"
          id="stl"
          name="stl"
          className="hidden"
        />
      </label>

      <button
        className="cursor-pointer p-2 text-lg text-green-800 hover:underline"
        onClick={loadExampleModel}
      >
        or load the example model
      </button>

      <p
        className={`mt-2 text-center text-red-600 transition-opacity ${
          loadStatus == 3 ? "custom-visible" : "custom-hidden"
        }`}
      >
        Please upload a valid Stl file.
      </p>
    </div>
  );
};

export default UploadForm;
