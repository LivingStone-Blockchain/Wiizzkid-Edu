import { FC, useEffect, useContext } from "react";
import { FaAngleRight } from "react-icons/fa";
import { vrGameVideo } from "../assets/videos";
import Button from "./button/Button";
import Video from "./Video";


interface SplashScreenProps {
  showSplashScreen: boolean;
  setShowSplashScreen: any;
}

const SplashScreen: FC<SplashScreenProps> = ({
  showSplashScreen, setShowSplashScreen
}) => {

  return (
    <section className="flex w-full h-full min-h-screen p-6 ">
      <div className="m-auto z-50">
        <h1 className="text-2xl font-bold motion-safe:animate-bounce text-center bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent transition">
          <span className="text-5xl block mb-2">Join</span> the Wiizkid
          Revolution!
        </h1>

         <Button
          onClick={() => setShowSplashScreen(false)}
          className="mx-auto mt-12"
        >
          Skip <FaAngleRight />
        </Button>
      </div>

      {/* <div className="bg-white blur-3xl fixed w-full h-full top-0 right-0 left-0 bottom-0"></div> */}

      <div className="fixed top-0 right-0 bottom-0 left-0 w-full h-screen">
        <Video className="w-full object-cover h-screen" video={vrGameVideo} />
      </div>
    </section>
  );
};

export default SplashScreen;
