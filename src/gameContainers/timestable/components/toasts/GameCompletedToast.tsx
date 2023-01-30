import React, { FC } from 'react';
import { win, low } from "../../assets/images";
import { Button } from '../button/index';
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";


type gameCompletedProps = {
  score:number, 
  gameDuration: number, 
  totalAttempted: number, 
  totalAllowedPlayers: number,
  navigate: NavigateFunction,
  setStart:React.Dispatch<React.SetStateAction<boolean>>,
  setGameCompleted:React.Dispatch<React.SetStateAction<boolean>>,
  setShowCreateGameModal: React.Dispatch<React.SetStateAction<boolean>>,
  setShowLeaderBoard:  React.Dispatch<React.SetStateAction<boolean>>,
}


const GameCompletedToast: FC<gameCompletedProps> = ({ score, gameDuration, totalAllowedPlayers, totalAttempted, navigate, setStart, setShowCreateGameModal, setGameCompleted, setShowLeaderBoard }) => {
 
  return (
              <section className="w-full py-4">
              {(score/(gameDuration * 60)) >= 0.075 ? (
                  <img src={win} className="w-24 mx-auto" alt="win" />
              ) : (
                <img src={low} className="w-24 mx-auto" alt="lose" />
              )}
      
              <article className="text-center mt-4">
                <h1 className="text-2xl font-bold text-teal">
                    Timestable Completed!
                </h1>
            
                <p className="mt-8">
                  <span className="text-xl bg-gray-200 px-4 py-2 rounded font-bold">
                    Score: {score}
                  </span>
                </p>
                <p className="mt-4">
                    {`Duration: ${gameDuration} mins.`}
                </p>
                <p className="mt-4">
                    Total Attempted: {totalAttempted}
                </p>
    
                
                  {(score/(gameDuration * 60)) >= 0.075 ? (
                      <p className="mt-8 font-semibold" >Well done!</p>
                  ) : (
                    <p className="mt-8 font-semibold" >You can do better!</p>
                  )}
    
              {totalAllowedPlayers === 1 ? (
                <Button
                  className="flex justify-center mx-auto items-center gap-2 md:w-48 w-36 md:text-base text-sm bg-navy font-semibold px-5 py-3  text-white transition text-center mt-8"
                  onClick={() => { toast.dismiss(); setStart(false); setGameCompleted(false); setShowCreateGameModal(false); navigate('/timestable-home') }}
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
         )
  }

export default GameCompletedToast;
