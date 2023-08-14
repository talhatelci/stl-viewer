import { useRef, useState } from "react";

const ModelForm = ({ setModelPath, loaded }) => {
  const fileInput = useRef(null);
  const [showError, setShowError] = useState(false);

  const onChange = () => {
    let path = fileInput.current.value;
    if (path.slice(-4) != ".stl") {
      setShowError(true);
      return;
    }

    let url = URL.createObjectURL(fileInput.current.files[0]);
    setShowError(false);
    setModelPath(url);
  };

  const loadExampleModel = (event) => {
    event.preventDefault();
    setModelPath("/teapot.stl");
  };

  return (
    <form
      className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-y-2 ${
        loaded ? "hidden" : "flex"
      }`}
    >
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
        className={`pointer-events-none mt-2 text-red-600 transition-opacity ${
          showError ? "opacity-100" : "opacity-0"
        }`}
      >
        Please upload a valid Stl file.
      </p>
    </form>
  );
};

export default ModelForm;
