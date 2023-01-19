import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { eduImg } from "../assets/images";
import { Button } from "../../../components";
import categoryStrings from "../components/functions/categoryStringConveter";
import Overlay from "../components/Overlay";
import QuizGame from "../components/quiz-game/QuizGame";
import { QuizContext, QuizContextType } from "../../../context/quiz.context";

export default function QuizPlay() {
  const { startGame, setScore, start, setStart, category, difficulty, totalAllowedQuestions, gameDuration, joinDetails } = useContext(QuizContext) as QuizContextType;


  const [loading, setLoading] = useState<boolean>(false);


  const handleStartGame = () => {

    setLoading(true);
    toast.loading("Preparing to start quiz...", { duration: 3000, id: "prepping" });


    setScore(0);


    // send username & email to backend and return JWT
    // store JWT in localStorage

    setTimeout(() => {
      toast.dismiss("prepping");
      toast.dismiss("username");
      setLoading(false);
      setStart(true);
      startGame(Date.now());
      toast.success(<span className="text-sm">Your Wiizzkid quiz game has begun!</span>, { id: "begin" });
    }, 3000)

  };





  return (
    <main>
      <Overlay loading={loading} />
      {/* game modal containing quiz questions: */}
      <QuizGame showModal={start} />

      <section
        className="flex w-full h-full min-h-screen p-6 "
        style={{
          backgroundImage: `url(${eduImg})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-gradient-to-r from-navyLight via-navyLight to-[#a5a6c8] blur-3xl fixed w-full h-full top-0 right-0 left-0 bottom-0"></div>

        <div className="mx-auto max-w-lg text-sm shadow border border-navy p-6 rounded bg-white rounded-tl-xl rounded-br-xl relative w-full">
          {joinDetails?.game_detail.current_players === joinDetails?.game_detail.total_players ? (
            <>
              <article className="text-gray-700">
            <h1 className="md:text-2xl text-xl font-bold mb-4 text-navy">{`${(categoryStrings(Number(category))[0]).toUpperCase()}${categoryStrings(Number(category)).slice(1)} Quiz`} <span className="text-tomato">{` (${difficulty[0].toUpperCase()}${difficulty.slice(1)})`}</span></h1>
            <p className="text-gray-700 space-x-5 my-3 md:text-lg text-base leading-relaxed font-medium">Quiz Instructions:</p>

            <p className="mb-2 text-gray-600 my-3 md:text-base text-sm leading-relaxed">
              There are <span className="font-bold">{totalAllowedQuestions}</span> multiple choice questions. Each question has one
              point. Attempt to answer all the questions within <span className="font-bold">{gameDuration}</span>  minutes.
            </p>

            <p className="mb-2 text-gray-600 space-x-5 my-3 md:text-base text-sm leading-relaxed">
              Your game score will be calculated based on how many questions you
              answered correctly and the winner will be the player with the
              highest score and quickest to submit.
            </p>

            <p className="font-bold mt-8 text-navy">
              <span className="text-xl">Ready</span> to join the Wiizkid
              revolution? Proceed.
            </p>
          </article>

          <Button
            onClick={handleStartGame}
            className="flex justify-center items-center gap-2 md:w-48 w-36 md:text-base mt-8 text-sm bg-navy font-semibold px-5 py-3  text-white transition text-center"
          >
            Start Quiz <FaArrowRight className="ml-3" />
          </Button>
            </>
          ) : (
            <article className="text-gray-700 space-y-12">
            <p className="text-gray-700 space-x-5 my-3 md:text-lg text-base leading-relaxed font-medium text-center">{`${joinDetails?.message}!`}</p>

            <div className="mb-2 text-gray-600 my-3 md:text-base text-sm leading-relaxed flex items-center justify-center flex-col gap-16">
              <p>Waiting for</p> 
              <p className= "h-16 w-16 bg-navy rounded-full flex justify-center items-center animation-pulsating text-white font-bold md:text-lg text-base">{joinDetails!.game_detail.total_players - joinDetails!.game_detail.current_players}</p>
              <p> more  {joinDetails!.game_detail.total_players - joinDetails!.game_detail.current_players === 1 ? "player" : "players"}...</p>
            </div>
            </article>
          )}
        </div>
      </section>
    </main>
  );
}
