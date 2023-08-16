import { PathContext } from "./StlViewer.jsx";
import { useContext, useEffect, useRef, useState } from "react";

const ModelForm = () => {
  const { filePath, setFilePath } = useContext(PathContext);

  const fileInput = useRef(null);
  const [errorVisible, setErrorVisible] = useState(false);

  const onChange = () => {
    let path = fileInput.current.value;
    if (path.slice(-4) != ".stl") {
      setErrorVisible(true);
      return;
    }

    let url = URL.createObjectURL(fileInput.current.files[0]);
    setFilePath(url);
    setErrorVisible(false);
    fileInput.current.value = "";
    delete fileInput.current.files[0];
    console.log(filePath);
  };

  const loadExampleModel = (event) => {
    event.preventDefault();
    setFilePath("/teapot.stl");
    setErrorVisible(false);
  };

  return (
    <form className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-y-2">
      <label
        htmlFor="stl"
        className="cursor-pointer bg-green-800 p-4 text-xl text-white transition hover:bg-green-900"
      >
        Upload Stl Model
      </label>
      <input
        type="file"
        id="stl"
        name="stl"
        className="hidden"
        onChange={onChange}
        ref={fileInput}
      />

      <button
        className="cursor-pointer p-2 text-lg text-green-800 hover:underline"
        onClick={loadExampleModel}
      >
        or load the example model
      </button>

      {/* Error message */}
      <p
        className={`mt-2 text-red-600 transition-opacity ${
          errorVisible ? "custom-visible" : "custom-hidden"
        }`}
      >
        Please upload a valid Stl file.
      </p>
    </form>
  );
};

export default ModelForm;
