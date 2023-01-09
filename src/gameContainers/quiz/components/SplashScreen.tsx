import { FC } from "react";
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
        <h1 className="text-2xl font-bold motion-safe:animate-bounce text-center bg-tealLight bg-clip-text text-transparent transition">
          <span className="text-5xl block mb-2">Join!</span> The Wiizzkid
          Revolution.
        </h1>

         <Button
          onClick={() => setShowSplashScreen(false)}
          className="mt-12 flex justify-center items-center gap-2 md:w-36 w-28 md:text-base text-sm bg-tealLight text-navy mx-auto font-semibold px-5 py-3  bg-text-darken shadow-btn-darken transition text-center"
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
