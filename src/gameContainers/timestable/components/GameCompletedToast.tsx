import React, { FC } from 'react';
import { win, low } from "../assets/images";
import Button from "./Button";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";


type gameCompletedProps = {
  score:number, 
  gameDuration: number, 
  totalAttempted: number, 
  navigate: NavigateFunction,
  setShowCreateGameModal: React.Dispatch<React.SetStateAction<boolean>>,
}


const GameCompletedToast: FC<gameCompletedProps> = ({ score, gameDuration, totalAttempted, navigate, setShowCreateGameModal }) => {
 
  return (
              <section className="w-full py-4">
              {(score/(gameDuration * 60)) >= 0.075 ? (
                  <img src={win} className="w-24 mx-auto" alt="win" />
              ) : (
                <img src={low} className="w-24 mx-auto" alt="lose" />
              )}
      
              <article className="text-center mt-4">
                <h1 className="text-2xl font-bold text-green-600">
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
    
      
                <Button
                  className="mx-auto mt-8"
                  onClick={() => {toast.dismiss(); navigate('/'); setShowCreateGameModal(false)}}
                  value="Back Home"
                />
              </article>
            </section>
         )
  }

export default GameCompletedToast;
