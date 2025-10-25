import GlobalImage from "@/modules/common/components/GlobalImage/GlobalImage";
import { CameraPositionProvider } from "@/modules/common/contexts/CameraPositionContext";
import Home from "@/modules/home";
import MovingCharacter from "@/modules/home/MovingCharacter";

const Page = () => {
  return (
    <CameraPositionProvider>
      <MovingCharacter />

      <Home />
    </CameraPositionProvider>
  );
};

export default Page;
