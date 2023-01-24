import { win, low } from "../../assets/images";
import Button from "../button/Button";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";




const quizCompletedToast = (score: number, totalAllowedQuestions: number, totalAllowedPlayers: number, timeDiffCalculator: string, setStart: (value: React.SetStateAction<boolean>) => void, setTriviaFetch: (value: React.SetStateAction<boolean>) => void, setShowCreateGameModal: (value: React.SetStateAction<boolean>) => void, setShowLeaderBoard: (value: React.SetStateAction<boolean>) => void, navigate: NavigateFunction) => {

  toast(
    () => (
      <section className="w-full py-4">
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
            {`Completion Time: ${timeDiffCalculator} mins.`}
          </p>


          {(score / totalAllowedQuestions) >= 0.5 ? (
            <p className="mt-8 font-semibold" >Well done!</p>
          ) : (
            <p className="mt-8 font-semibold" >You can do better!</p>
          )}


          {totalAllowedPlayers === 1 ? (
            <Button
              className="flex justify-center mx-auto items-center gap-2 md:w-48 w-36 md:text-base text-sm bg-navy font-semibold px-5 py-3  text-white transition text-center mt-8"
              onClick={() => { setStart(false); setTriviaFetch(false); setShowCreateGameModal(false); navigate('/quiz-home') }}
            >
              Back home
            </Button>
          ) : (
            <Button
              className="flex justify-center mx-auto items-center gap-2 md:w-48 w-36 md:text-base text-sm bg-navy font-semibold px-5 py-3  text-white transition text-center mt-8"
              onClick={() => { toast.dismiss(); setShowCreateGameModal(false);  setShowLeaderBoard(true);}}
            >
              See Board
            </Button>
          )}
        </article>
      </section>
    ),
    { duration: Infinity }
  )
}

export default quizCompletedToast;
