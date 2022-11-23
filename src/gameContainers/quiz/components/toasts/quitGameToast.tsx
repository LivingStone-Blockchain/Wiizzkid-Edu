import Button from "../button/Button";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";



const quizEndGameToast = (setLoading: (value: React.SetStateAction<boolean>) => void, navigate: NavigateFunction) => {

    toast(
        () => (
          <article className="text-sm">
            <p className="mb-4">
              <FaExclamationCircle className="text-3xl text-gray-500" />
            </p>
  
            <p>Leaving the game will cancel your current game progress...</p>
  
            <div className="flex items-center mt-6">
              <button
                onClick={() => {
                  setLoading(false);
                  toast.dismiss();
                }}
                className="font-bold py-2 px-3 border rounded bg-gradient-to-r from-orange-600 to-red-600 text-white text-center"
              >
                Stay in game
              </button>
  
              <button
                onClick={() =>
                  {toast.loading("Quitting game...", { duration: 4000 }); setTimeout(() => {toast.dismiss(); navigate('/')}, 4000); }
                }
                className="font-bold py-2 px-3 border border-red-400 text-red-500 ml-3 rounded"
              >
                End game
              </button>
            </div>
          </article>
        ),
        { duration: Infinity }
      )
        }

export default quizEndGameToast;
