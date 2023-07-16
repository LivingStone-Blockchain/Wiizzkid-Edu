import { win, low } from "../../assets/images";
import Button from "../button/Button";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { FC } from "react";




type CompletedPropsType = {
  score: number, 
  setScore: (value: React.SetStateAction<number>) => void, 
  totalAllowedQuestions: number,
  totalAllowedPlayers: number,
  timeDiffCalculator: string, 
  setStart: (value: React.SetStateAction<boolean>) => void, 
  setTriviaFetch: (value: React.SetStateAction<boolean>) => void, 
  setShowCreateGameModal: (value: React.SetStateAction<boolean>) => void, 
  setShowLeaderBoard: (value: React.SetStateAction<boolean>) => void, 
  allSubmitted: boolean,
  submitted: boolean,
  setSubmitted: (value: React.SetStateAction<boolean>) => void,
  setAllSubmitted: (value: React.SetStateAction<boolean>) => void,
  navigate: NavigateFunction
}



const QuizCompletedToast:FC<CompletedPropsType> = ({score, setScore, totalAllowedQuestions, totalAllowedPlayers, timeDiffCalculator, setStart, setTriviaFetch, setShowCreateGameModal, setShowLeaderBoard, submitted, allSubmitted, setAllSubmitted, setSubmitted, navigate}) => {




    return (
      <section className={`flex items-center justify-center w-full h-auto max-w-[360px] z-[100] fixed top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 transform transition-all ease-in-out duration-700 rounded-lg ${submitted ? 'scale-[1]' : 'scale-0'}`}>
        <div className="h-full w-full mx-auto overflow-hidden py-5 bg-white rounded-lg shadow-xl">
        {(score / totalAllowedQuestions) >= 0.5 ? (
          <img src={win} className="w-24 mx-auto" alt="win" />
        ) : (
          <img src={low} className="w-24 mx-auto" alt="lose" />
        )}

        <article className="text-center mt-4">
          <h1 className="text-2xl font-bold text-teal">
            Quiz Game Completed!
          </h1>

          <p className="mt-8">
            <span className="text-xl bg-gray-200 px-4 py-2 rounded font-bold text-navy">
              Score: {score}
            </span>
          </p>
          <p className="mt-4 text-gray-500 space-x-5 my-3 md:text-base text-sm leading-relaxed">
            {`Completion Time: ${timeDiffCalculator} secs.`}
          </p>
        
            <p className="mt-8 font-semibold" >{(score / totalAllowedQuestions) >= 0.5 ? 'Well done!' : 'You can do better!'}</p>


          {totalAllowedPlayers === 1 ? (
            <Button
              className="flex justify-center mx-auto items-center gap-2 md:w-48 w-36 md:text-base text-sm bg-navy font-semibold px-5 py-3  text-white transition text-center mt-8"
              onClick={() => { toast.dismiss(); setScore(0); setSubmitted(false); setStart(false); setTriviaFetch(false); setShowCreateGameModal(false); navigate('/quiz-home') }}
            >
              Back home
            </Button>
          ) : (
            <Button
              className={`flex justify-center mx-auto items-center gap-2 md:w-48 w-36 md:text-base text-sm bg-navy font-semibold px-5 py-3  text-white transition text-center mt-8 ${allSubmitted ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none cursor-not-allowed'}`}
              onClick={() => { toast.dismiss(); setShowCreateGameModal(false);  setSubmitted(false); setShowLeaderBoard(true)}}
            >
            {allSubmitted ? "See Board" : "Loading results..."}
            </Button>
          )}
        </article>
        </div>
      </section>
    )

}

export default  QuizCompletedToast;
