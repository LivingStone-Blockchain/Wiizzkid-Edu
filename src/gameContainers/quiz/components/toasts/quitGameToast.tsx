import Button from "../button/Button";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";


const quizEndGameToast = (setLoading: (value: React.SetStateAction<boolean>) => void, navigate: NavigateFunction, setShowCreateGameModal: (value: React.SetStateAction<boolean>) => void) => {

    toast(
        () => (
          <article className="text-sm">
            <p className="mb-4">
              <FaExclamationCircle className="text-3xl text-[#FF3939]" />
            </p>
  
            <p className="mb-2 text-gray-600 my-3 md:text-base text-sm leading-relaxed">Leaving the game will cancel your current game progress...</p>
  
            <div className="flex items-center mt-6 gap-2">
              <Button 
                children="Stay in game"
                onClick={() => {
                  setLoading(false);
                  toast.dismiss();
                }}
                className="flex justify-center items-center gap-2 md:text-base text-sm bg-[#252641] font-semibold px-5 py-3  text-white transition text-center"
              />

              <Button 
                children="End game"
                onClick={() =>
                  {toast.loading("Quitting game...", { duration: 4000 }); setTimeout(() => {toast.dismiss(); navigate('/quiz-home'); setShowCreateGameModal(false)}, 4000); }
                }
                className="flex justify-center items-center gap-2 md:text-base text-sm text-[#252641] border-2 border-[#252641] font-semibold px-5 py-[9px]  bg-white transition text-center"
              />
             
            </div>
          </article>
        ),
        { duration: Infinity }
      )
        }

export default quizEndGameToast;
