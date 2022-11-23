import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { educationImg } from "../assets/images";
import categoryStrings from "../components/functions/categoryStringConveter";
import Overlay from "../components/Overlay";
import QuizGame from "../components/quiz-game/QuizGame";
import { GameContext, GameContextType } from "../../../context/game.context";

export default function QuizPlay() {
  const { startGame, start, setStart, category, difficulty, totalAllowedQuestions, gameMode, gameDuration } = useContext(GameContext) as GameContextType;


  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


  const handleStartGame = (e: any) => {
    e.preventDefault();

    if (!username) {
      return toast.error("Please enter a username!");
    }

    if (!email) {
      return toast.error("Please enter your email!");
    }

    setLoading(true);
    toast.loading("Preparing to start quiz...", { duration: 3000, id: "prepping" });


    const payload = {
      username,
      email,
    };

    console.log(payload);

    // send username & email to backend and return JWT
    // store JWT in localStorage

   setTimeout(() => {
      toast.dismiss("prepping");
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
          backgroundImage: `url(${educationImg})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-gradient-to-r from-orange-600 via-red-500 to-yellow-600 blur-3xl fixed w-full h-full top-0 right-0 left-0 bottom-0"></div>

        <div className="mx-auto max-w-lg text-sm shadow border border-orange-400 p-6 rounded bg-white rounded-tl-xl rounded-br-xl relative">
          <article className="text-gray-700">
          <h1 className="font-bold text-2xl mb-4">
              {`${(categoryStrings(Number(category))[0]).toUpperCase()}${categoryStrings(Number(category)).slice(1)} Quiz (${difficulty[0].toUpperCase()}${difficulty.slice(1)})`}
            </h1>

            <p className="font-bold mb-2">Quiz Instructions:</p>

            <p className="mb-2">
              There are <span className="font-bold">{totalAllowedQuestions}</span> multiple choice questions. Each question has one
              point. Attempt to answer all the questions within <span className="font-bold">{gameDuration}</span>  minutes.
            </p>

            <p className="mb-2">
              Your game score will be calculated based on how many questions you
              answered correctly and the winner will be the player with the
              highest score and quickest to submit.
            </p>

            <p className="font-bold mt-8">
              <span className="text-xl">Ready</span> to join the Wiizkid
              revolution? Proceed.
            </p>
          </article>

          <form onSubmit={handleStartGame} className="mt-8">
            <div className="mb-3">
              <label className="mb-1 block text-gray-700" htmlFor="">
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

            <div className="mb-3">
              <label className="mb-1 block text-gray-700" htmlFor="">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your Email"
                className="w-full border rounded p-2 bg-stone-200"
              />
            </div>

            <button className="transition px-6 py-4 border border-orange-400 mt-6 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded flex items-center hover:from-red-600 hover:to-orange-600">
              Start Quiz <FaArrowRight className="ml-3" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
