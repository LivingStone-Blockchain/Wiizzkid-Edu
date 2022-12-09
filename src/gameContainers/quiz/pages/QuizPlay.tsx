import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { educationImg, eduImg } from "../assets/images";
import { Button } from "../../../components";
import categoryStrings from "../components/functions/categoryStringConveter";
import Overlay from "../components/Overlay";
import QuizGame from "../components/quiz-game/QuizGame";
import {QuizContext, QuizContextType } from "../../../context/quiz.context";

export default function QuizPlay() {
  const { startGame, start, setStart, category, difficulty, totalAllowedQuestions, gameMode, gameDuration } = useContext(QuizContext) as QuizContextType;


  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


  const handleStartGame = (e: any) => {
    e.preventDefault();

    if (!username) {
      return toast.error("Please enter a username!", {id: "username"});
    }



    setLoading(true);
    toast.loading("Preparing to start quiz...", { duration: 3000, id: "prepping" });


    const payload = {
      username,
    };

    console.log(payload);

    // send username & email to backend and return JWT
    // store JWT in localStorage

   setTimeout(() => {
      toast.dismiss("prepping");
      toast.dismiss("username");
      setLoading(false);
      setStart(true);
      startGame(Date.now());
      toast.success("Your Wiizzkid quiz game has begun!", { id: "begin" });
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
        <div className="bg-gradient-to-r from-[#4a4c7e] via-[#4a4c7e] to-[#a5a6c8] blur-3xl fixed w-full h-full top-0 right-0 left-0 bottom-0"></div>

        <div className="mx-auto max-w-lg text-sm shadow border border-[#252641] p-6 rounded bg-white rounded-tl-xl rounded-br-xl relative">
          <article className="text-gray-700">
            <h1 className="md:text-2xl text-xl font-bold mb-4 text-[#252641]">{`${(categoryStrings(Number(category))[0]).toUpperCase()}${categoryStrings(Number(category)).slice(1)} Quiz`} <span className="text-yellow-500">{` (${difficulty[0].toUpperCase()}${difficulty.slice(1)})`}</span></h1>
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

            <p className="font-bold mt-8 text-[#252641]">
              <span className="text-xl">Ready</span> to join the Wiizkid
              revolution? Proceed.
            </p>
          </article>

          <form onSubmit={handleStartGame} className="mt-8">
            <div className="mb-3">
              <label className="mb-2 block text-gray-600 space-x-5 my-3 md:text-base text-sm leading-relaxed font-normal" htmlFor="">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="w-full border rounded p-2 bg-stone-200"
                placeholder="Enter Username"
              />
            </div>
            <Button 
                className="flex justify-center items-center gap-2 md:w-48 w-36 md:text-base text-sm bg-[#252641] font-semibold px-5 py-3  text-white transition text-center shadow-btn-darken"
            >
             Start Quiz <FaArrowRight className="ml-3" />
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
