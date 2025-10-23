import { CameraPositionProvider } from "@/modules/common/contexts/CameraPositionContext";
import Home from "@/modules/home";

const Page = () => {
  return (
    <CameraPositionProvider>
      <Home />
    </CameraPositionProvider>
  );
};

export default Page;
