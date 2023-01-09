import React, { useState, useContext, useEffect } from "react";
import {
  home
} from "../assets/images";
import Overlay from "../components/Overlay";
import toast from "react-hot-toast";
import { FaAngleRight } from "react-icons/fa";
import Button from "../components/button/Button";
import CreateTimestable from "../components/CreateTimestable";
import { TimestableContext, TimestableContextType } from "../../../context/timestable.context";
import { Banner } from "../../../components";
import ScoreBalance from "../components/Score&Balance";


export default function TimestableIndex() {
  const {setScore, showCreateGameModal, setShowCreateGameModal, gameCreated} = useContext(TimestableContext) as TimestableContextType;

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
             
              className="flex flex-row space-x-3 my-8 justify-start w-full"
            >

              <input
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

     
    </>
  );
}


{/*

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
            backgroundImage: `url(${home})`,
            backgroundSize: "cover",
          }}
        >
          <div className="p-6 -my-12 shadow-2xl bg-white rounded w-full h-full">
            <h2 className="font-bold tracking-wide">Wiizzkid Timestable</h2>
            <p>Text your Maths Skill</p>

            <p
              onClick={handleDisplayCreateGameModal}
              className="mt-8 text-xs cursor-pointer capitalize font-semibold text-gray-600 flex items-center"
            >
              Start Timestable <FaAngleRight className="ml-1" />
            </p>
          </div>
        </section>
      </div>
*/}