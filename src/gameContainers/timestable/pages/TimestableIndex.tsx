import React, { useState, useContext, useEffect } from "react";
import {
  home
} from "../assets/images";
import Overlay from "../components/Overlay";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import Button from "../components/button/Button";
import CreateTimestable from "../components/CreateTimestable";
import { TimestableContext, TimestableContextType } from "../../../context/timestable.context";
import {UserContext, UserContextType} from '../../../context/user.context'
import { Banner } from "../../../components";
import ScoreBalance from "../components/Score&Balance";
import service from "../services/services";
import QuickPlay from "../components/Quickplay";
import History from "../components/History";



export default function TimestableIndex() {
  const { refreshedUser } = useContext(UserContext) as UserContextType
  const {setScore, showCreateGameModal, setShowCreateGameModal, gameCreated, user, setGameDetails} = useContext(TimestableContext) as TimestableContextType;
  const [joinGameCode, setJoinGameCode] = useState<string>("");
  const navigate = useNavigate();
  



   //join a game with code
   const handlePlayQuizGame = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!joinGameCode) {
     return toast.error(<span className="text-sm">Please enter a quiz game code!</span>);
    }

    if (!user) {
    return toast.error(<span className="text-sm">Login to use code!</span>, {duration: 4000});
    }


    try {
      await service.joinGame(joinGameCode, refreshedUser?.access!).then(res => {setGameDetails(res)});
      navigate(`/timestable?code=${joinGameCode}`);
    } catch (error: any) {
      toast.error(<span className="text-sm">{error.response.data.error}</span>, {duration: 4000});
    }

    setJoinGameCode('');
  };





  const handleDisplayCreateGameModal = () => {
    setShowCreateGameModal(true);
    setScore(0)

    toast(
      <CreateTimestable setShowCreateGameModal={setShowCreateGameModal} />,
      { duration: Infinity, id: "showModal", className: "w-full" }
    );
  };


  return (
    <>
         <Overlay loading={showCreateGameModal || gameCreated} />
         <Banner
          title="Wiizzkid Timestable"
          children={<ScoreBalance />}
        />
        

        <section className="md:mt-20 mt-16">
        <div className="w-full text-white mb-24 container px-4 lg:px-8 mx-auto max-w-screen-xl">
          <div className="flex justify-between items-center max-w-full mx-auto">
            <article>
              <h1 className="md:text-2xl text-xl font-semibold text-navy">Let's <span className="text-tomato">play</span></h1>
              <p className="text-gray-500 space-x-5 my-3 md:text-base text-sm leading-relaxed font-medium">Join the Wiizzkid revolution...</p>
            </article>
          </div>
        </div>

        <div
          className="-my-8 pb-40 py-6 px-4 max-w-3xl mx-auto text-sm bg-stone-800 rounded-tl-3xl rounded-tr-3xl"
          style={{
            backgroundImage: `url(${home})`,
            backgroundSize: "cover",
          }}
        >
          <div className="p-6 -my-12 shadow-2xl bg-navy text-white rounded w-full h-full">
            <h2 className="font-bold tracking-wide md:text-base text-sm">Enter your quiz code</h2>
            <p className="text-sm">To play with your friends</p>

            <form 
             onSubmit={handlePlayQuizGame}
              className="flex flex-row space-x-3 my-8 justify-start w-full"
            >
              <input
                  value={joinGameCode}
                  onChange={(e) => setJoinGameCode(e.target.value)}
                  type="text"
                placeholder="Ex. c19090"
                className="flex-initial w-full first-letter:rounded-full py-3 placeholder:text-sm placeholder:text-gray-400 text-sm pl-5 bg-transparent border-2 border-white rounded-full" />
              <Button
                children='Enter'
                type='submit'
                className='flex-initial md:w-36 w-28 text-white mx-auto sm:mx-0 font-semibold px-5 py-3  bg-navy shadow-btn-darken col-span-4 md:col-span-2 transition text-center ml-2'
                style={{ background: "linear-gradient(105.5deg, #545AE7 19.57%, #393FCF 78.85%)" }}
              />
            </form>

            <p
              onClick={handleDisplayCreateGameModal}
              className="text-xs cursor-pointer capitalize font-semibold text-white flex items-center"
            >
              Or start Timestable <FaAngleRight className="ml-1" />
            </p>
          </div>
        </div>
      </section>
      <QuickPlay handleDisplayCreateGameModal = {handleDisplayCreateGameModal}/>
      <History />
    </>
  );
}

