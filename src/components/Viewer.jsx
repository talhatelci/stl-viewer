import UploadForm from "./UploadForm.jsx";
import LoadingScreen from "./LoadingScreen.jsx";
import Canvas3D from "./Canvas3D.jsx";
import CloseButton from "./CloseButton.jsx";

const Viewer = () => {
  return (
    <div className="relative h-[60vh] w-full border border-green-800 lg:h-[calc(100vh-8rem)] lg:w-2/3">
      <UploadForm />
      <LoadingScreen />
      <Canvas3D />
      <CloseButton />
    </div>
  );
};

export default Viewer;
