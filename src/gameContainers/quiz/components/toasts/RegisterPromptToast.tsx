import { average, puzzle, referral, trophy } from "../../../../assets/dashboard/index";
import Button from "../button/Button";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";




const RegisterPromptToast = () => {


  return(
     
        <div className="py-16 bg-blue-300"> 
        <div className="container m-auto space-y-8 px-6 text-gray-500 md:px-12 lg:px-20">
          <div
            className="justify-center gap-6 text-center md:flex md:text-left lg:items-center lg:gap-16"
          >
            <div className="order-last mb-6 space-y-6 md:mb-0 md:w-6/12 lg:w-6/12">
              <h1 className="text-4xl font-bold text-gray-800 md:text-5xl dark:text-white">
                Buy now and benefit up to <span className="text-primary dark:text-sky-300">30% off</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Be part of millions people around the world using tailus in modern User Interfaces.
              </p>
              <div className="flex gap-6">
              <Button
                className="flex justify-center mx-auto items-center gap-2 md:w-48 w-36 md:text-base text-sm bg-navy font-semibold px-5 py-3  text-white transition text-center mt-8"
                //onClick={() => { toast.dismiss(); setStart(false); setTriviaFetch(false); setShowCreateGameModal(false); navigate('/register') }}
                >
                Sign Up
            </Button>
            <Button
              className="flex justify-center mx-auto items-center gap-2 md:w-48 w-36 md:text-base text-sm bg-navy font-semibold px-5 py-3  text-white transition text-center mt-8"
              //onClick={() => { toast.dismiss(); setStart(false); setTriviaFetch(false); setShowCreateGameModal(false); navigate('/quiz-home') }}
                >
                Back home
            </Button>
            </div>
            </div>
            <div className="grid grid-cols-5 grid-rows-4 gap-4 md:w-5/12 lg:w-6/12">
              <div className="col-span-2 row-span-4">
                <img
                  src={referral}
                  className="rounded-full"
                  width="640"
                  height="960"
                  alt="shoes"
                  loading="lazy"
                />
              </div>
              <div className="col-span-2 row-span-2">
                <img
                  src={average}
                  className="h-full w-full rounded-xl object-cover object-top"
                  width="640"
                  height="640"
                  alt="shoe"
                  loading="lazy"
                />
              </div>
              <div className="col-span-3 row-span-3">
                <img
                  src={puzzle}
                  className="h-full w-full rounded-xl object-cover object-top"
                  width="640"
                  height="427"
                  alt="shoes"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
                                          
    )
}

export default RegisterPromptToast;
