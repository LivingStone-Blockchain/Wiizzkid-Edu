import { win, low } from "../../assets/images";
import Button from "../button/Button";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";




const quizCompletedToast = (score:number, totalAllowedQuestions:number, timeDiffCalculator:string, setStart: (value: React.SetStateAction<boolean>) => void, setTriviaFetch: (value: React.SetStateAction<boolean>) => void, navigate: NavigateFunction) => {

             toast(
                () => (
                  <section className="w-full py-4">
                  {(score/totalAllowedQuestions) >= 0.5 ? (
                     <img src={win} className="w-24 mx-auto" alt="win" />
                  ) : (
                    <img src={low} className="w-24 mx-auto" alt="lose" />
                  )}
          
                  <article className="text-center mt-4">
                    <h1 className="text-2xl font-bold text-green-600">
                      Quiz Game Completed!
                    </h1>
                
                    <p className="mt-8">
                      <span className="text-xl bg-gray-200 px-4 py-2 rounded font-bold">
                        Score: {score}
                      </span>
                    </p>
                    <p className="mt-4">
                        {`Completion Time: ${timeDiffCalculator} mins.`}
                  </p>
        
                   
                      {(score/totalAllowedQuestions) >= 0.5 ? (
                         <p className="mt-8 font-semibold" >Well done!</p>
                      ) : (
                        <p className="mt-8 font-semibold" >You can do better!</p>
                      )}
        
          
                    <Button
                      className="mx-auto mt-8"
                      onClick={() => {toast.dismiss(); setStart(false); setTriviaFetch(false); navigate('/')}}
                    >
                      Back home
                    </Button>
                  </article>
                </section>
                ),
                { duration: Infinity }
              )
        }

export default quizCompletedToast;
