import { FC, useContext, useEffect, useState, useRef } from 'react'
import {
  FaArrowRight,
  FaClock,
  FaQuestionCircle,
  FaTimes,
} from "react-icons/fa";
import  TimestableCard  from './TimestableCard';
import Overlay from '../Overlay';
import { TimestableContext, TimestableContextType } from '../../../../context/timestable.context';
import { useNavigate } from 'react-router-dom';
import quizEndGameToast from '../toasts/quitGameToast';


type TimestableGameType = {
  showModal: boolean
}


const TimestableGame: FC<TimestableGameType> = ({ showModal }) => {
  const navigate = useNavigate();
  const {gameCompleted, setLoading, loading, setShowCreateGameModal,setGameCompleted, setStart, setScore, setSubmitted } = useContext(TimestableContext) as TimestableContextType;

  const quitGame = () => {
    setLoading(true);
    quizEndGameToast(setStart,  setSubmitted, setScore, setLoading, setGameCompleted, navigate, setShowCreateGameModal);
    return;
  };


  //close game
  if (!showModal) {
    return null;
  }



  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 h-full bg-gray-100 z-50 text-gray-700 p-6 overflow-y-scroll pb-40 transition">
      <Overlay loading={loading || gameCompleted}/>
      <div className="max-w-xl mx-auto opacity-90">
        <nav className="flex justify-between items-center">
          <FaTimes
            className="text-2xl cursor-pointer text-navy"
            onClick={quitGame}
          />

          <h1 className="text-xl font-bold text-navy">Times<span className="text-tomato">table</span></h1>

          <div className="group max-w-max relative mx-1 flex flex-col items-center justify-center z-50">
            <FaQuestionCircle className="text-2xl cursor-pointer text-navy" />
            <div className="[transform:perspective(50px)_translateZ(0)_rotateX(10deg)] group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)] mb-6 origin-bottom transform rounded text-white opacity-0 transition-all duration-300 group-hover:opacity-100 absolute top-7 right-0 md:inset-x-auto">
              <div className="max-w-xs flex-col items-center">
                <div className="clip-bottom h-2 w-4 bg-navy hidden md:flex mx-auto" style={{ clipPath: "polygon(0% 50%, 100% 100%, 0% 100%, 50% 0%, 100% 100%)" }}></div>
                <div className="w-52 rounded bg-navy font-medium p-2 text-xs text-center leading-relaxed shadow-lg">Get as many multiplication questions correctly as possible in selected time.</div>
              </div>
            </div>
          </div>
        </nav>
        <main className="py-10">
          <TimestableCard />
        </main>
        <footer className="fixed bottom-0 right-0 left-0 w-full shadow p-4 flex items-center justify-between">
          <p className='text-navy opacity-80 text-xs mx-auto'>Wiizzkid &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </section>

  )
}

export default TimestableGame