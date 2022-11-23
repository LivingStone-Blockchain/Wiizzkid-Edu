import React, { useState, useContext } from "react";
import {
  educationImg,
  englishImg,
  generalKnowledgeImg,
  mathImg,
} from "../assets/images";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CreateQuizGameModal from "../components/CreateQuizGameModal";
import Overlay from "../components/Overlay";
import Button from "../components/button/Button";
import { GameContext, GameContextType } from "../../../context/game.context";

export default function QuizIndex() {
  const navigate = useNavigate();
  const { setScreen, setScore} = useContext(GameContext) as GameContextType;
  const [quizGameCode, setQuizGameCode] = useState<string>("");
  const [showCreateGameModal, setShowCreateGameModal] =
    useState<boolean>(false);


  const handlePlayQuizGame = (e: any) => {
    e.preventDefault();

    if (!quizGameCode) {
      toast.error("Please enter a quiz game code!");
      return;
    }

    navigate(`/quiz?code=${quizGameCode}`);
  };

  const handleDisplayCreateGameModal = () => {
    setShowCreateGameModal(true);
    setScreen(1)
    setScore(0)

    toast(
      <CreateQuizGameModal setShowCreateGameModal={setShowCreateGameModal} />,
      { duration: Infinity, className: "w-full" }
    );
  };

  return (
    <React.Fragment>
      <Overlay loading={showCreateGameModal} />

      <div className="bg-gradient-to-r from-orange-600 via-red-500 to-yellow-600 opacity-95">
        <nav className="w-full text-white h-40">
          <section className="flex justify-between items-center max-w-3xl mx-auto p-6">
            <article className="text-sm">
              <h1 className="text-2xl font-bold tracking-wide">Let's play</h1>
              <p>...join the Wiizkid revolution</p>
            </article>

            <div className="bg-white rounded-full w-8 h-8 text-gray-700 flex">
              <span className="m-auto">DE</span>
            </div>
          </section>
        </nav>

        <section
          className="-my-8 pb-40 p-6 max-w-3xl mx-auto text-sm bg-stone-800 rounded-tl-3xl rounded-tr-3xl"
          style={{
            backgroundImage: `url(${educationImg})`,
            backgroundSize: "cover",
          }}
        >
          <div className="p-6 -my-12 shadow-2xl bg-white rounded w-full h-full">
            <h2 className="font-bold tracking-wide">Enter your quiz code</h2>
            <p>To play with your friends</p>

            <form
              onSubmit={handlePlayQuizGame}
              className="grid grid-cols-12 mt-6"
            >
              <input
                value={quizGameCode}
                onChange={(e) => setQuizGameCode(e.target.value)}
                type="text"
                className="p-3 bg-gray-100 col-span-8 md:col-span-10 rounded-tl rounded-bl border"
                placeholder="Ex. c19090"
              />

              <button className="p-3 rounded bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-bold text-sm col-span-4 md:col-span-2 hover:from-orange-600 hover:to-yellow-600 transition text-center ml-2">
                Enter
              </button>
            </form>

            <p
              onClick={handleDisplayCreateGameModal}
              className="mt-8 text-xs cursor-pointer capitalize font-semibold text-gray-600 flex items-center"
            >
              Or start a quiz game <FaAngleRight className="ml-1" />
            </p>
          </div>
        </section>

        <main className="py-24 max-w-3xl mx-auto p-6 ">
          <h1 className="font-bold text-gray-100 text-lg mb-6">
            Your Quiz History
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <section className="bg-white shadow-2xl p-6 rounded grid grid-cols-12 gap-4">
              <span className="col-span-3">
                <img
                  src={mathImg}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </span>

              <article className="col-span-9">
                <h1 className="font-bold text-gray-700">Mathematics</h1>

                <p>
                  <span>score:</span> 10/10
                </p>
              </article>
            </section>

            <section className="bg-white shadow-2xl p-6 rounded grid grid-cols-12 gap-4">
              <span className="col-span-3">
                <img
                  src={englishImg}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </span>

              <article className="col-span-9">
                <h1 className="font-bold text-gray-700">
                  English For Beginners
                </h1>

                <p>
                  <span>score:</span> 10/10
                </p>
              </article>
            </section>
          </div>

          <h1 className="font-bold text-gray-100 text-lg mt-10 mb-6">
            Join & Play With Others
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <section className="bg-white shadow-2xl p-6 rounded grid grid-cols-12 gap-4">
              <span className="col-span-3">
                <img
                  src={generalKnowledgeImg}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </span>

              <article className="col-span-9">
                <h1 className="font-bold text-gray-700">General Knowledge</h1>

                <p>
                  <span>icon</span> 10/10 questions
                </p>
              </article>
            </section>

            <section className="bg-white shadow-2xl p-6 rounded grid grid-cols-12 gap-4">
              <span className="col-span-3">
                <img
                  src={generalKnowledgeImg}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </span>

              <article className="col-span-9">
                <h1 className="font-bold text-gray-700">Science Knowledge</h1>

                <p>
                  <span>icon</span> 10/10 questions
                </p>
              </article>
            </section>
          </div>

          <Button
            onClick={handleDisplayCreateGameModal}
            className="mx-auto mt-20 border border-2"
          >
            Start A Quiz Game <FaAngleRight className="ml-3" />
          </Button>
        </main>
      </div>
    </React.Fragment>
  );
}
