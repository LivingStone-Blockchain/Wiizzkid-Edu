import { FC, useState, useRef, useEffect, useContext } from "react";
import toast from "react-hot-toast";

import {
  FaAngleLeft,
  FaArrowRight,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import { success } from "../assets/images";
import { Button } from './button/index';
import FormGroup from "./forms/FormGroup";
import Input from "./forms/Input";
import Label from "./forms/Label";
import Select from "./forms/Select";
import { TimestableContext, TimestableContextType } from "../../../context/timestable.context";
import { TokenContext, TokenContextType } from "../../../context/token.context";
import { utils } from "ethers";



type CreateTimestableType =  {
  setShowCreateGameModal: any
}



const CreateTimestable: FC<CreateTimestableType> = ({
  setShowCreateGameModal,
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { gameCreated, setGameCreated, gameDuration, setGameDuration, gameMode, setGameMode, difficulty, setDifficulty, handlePlayTimestable , handleSubmission,  totalAllowedPlayers, setTotalAllowedPlayers, gameDetails, setGameDetails } = useContext(TimestableContext) as TimestableContextType;
  const {stBalance }= useContext(TokenContext) as TokenContextType;
  const stoneBalance = Number(utils.formatEther(stBalance));


   //prevent unlogged user from accessing premium
   useEffect(() => {
    if (stoneBalance < 100 && gameMode !== 'london') {
      toast.dismiss('unlogged');
      toast.error(`Buy Stone to play ${gameMode} mode!`, { duration: 3000, id: 'unlogged' });
      setTimeout(() => {
        toast.dismiss('unlogged');
        setGameMode('london');
      }, 3000);
    }
  },[gameMode, stoneBalance]);



  const handleCopyClick = async () => {
    //exec command for older browsers
    ("clipboard" in navigator)
    ? await navigator.clipboard.writeText(textRef.current!.innerText)
    : document.execCommand("copy", true, textRef.current?.innerText);
   
    toast.success("Code copied successfully!");
  }




  const handleCloseModal = () => {
    setShowCreateGameModal(false);
    toast.dismiss();
    return;
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();

    toast.loading("Creating game...", { duration: 3000, id: "loading" });
   

    setTimeout(() => {
      toast.dismiss("loading");
      toast.success("Game created successfully!");
      setGameCreated(true);
    }, 4000);
  };




  if (gameCreated && gameDetails) {
    return (
      <section className="w-full py-4">
        <img src={success} className="w-24 mx-auto" alt="success" />

        <article className="text-center mt-4">
            <h1 className="text-2xl font-bold text-teal">
            Timestable Created!
          </h1>
      
          {gameMode !== "london" ? (
        <>
        <p className="mt-8">
            <span className="text-xl bg-gray-200 px-4 py-2 rounded font-bold text-navy">
              {gameDetails?.invite_code}
            </span>
          </p>
          <p className="mt-8 font-semibold cursor-grab relative">
            <span ref={textRef} onClick={handleCopyClick}>{`https://game.wiizkid.com/quiz?code=${gameDetails?.invite_code}`}</span>
            <span className="text-xs font-bold animate-pulse text-teal absolute top-5 right-10">copy</span>
          </p>
          <p className="mt-4 text-gray-500 space-x-5 my-3 md:text-base text-sm leading-relaxed">
            Copy and share your quiz code or link to your friends!
          </p>
        </>
      ) : (
        <>
           <p className="mt-8">
            <span className="text-xl bg-gray-200 px-4 py-2 rounded font-bold text-navy">
              Free Mode
            </span>
          </p>
           <p className="mt-8 text-gray-500 space-x-5 my-3 md:text-base text-sm leading-relaxed">
            Game codes/links can be generated and shared in premium modes!
          </p>
        </>
    )}

          <Button
            children="Play Timestable"
            onClick={handlePlayTimestable}
            className="mt-14 flex justify-center items-center gap-2 w-full md:text-base text-sm bg-navy mx-auto font-semibold px-5 py-3  text-white transition text-center"
          />
        </article>
      </section>
    );
  }

  return (
    <section className="pb-4 w-full">
         <div className="mb-7 flex items-center justify-end">
        <FaTimes
          onClick={handleCloseModal}
          className="float-right text-tomato cursor-pointer md:text-xl text-lg"
        />
      </div>
       
        <article className="relative">
          <h1 className="md:text-2xl text-xl font-bold mb-3 text-navy">Wiizzkid <span className="text-tomato">Revolution!</span></h1>
          <p className="hidden text-gray-700 space-x-5 my-2 md:text-lg text-base leading-relaxed font-medium">Start Timestable</p>
        </article>

      <form onSubmit={handleSubmit} className="mt-8">
          <div>
          <FormGroup>
              <Label>Select Game Mode</Label>
              <Select
                  value={gameMode}
                  onChange={(e: any) => setGameMode(e.target.value)}
              >
                <option value="london">London Mode</option>
                  <option value="beijing" className={`${stoneBalance < 100 ? 'text-gray-500' : ''}`}>Beijing Mode</option>
                <option value="shanghai" className={`${stoneBalance < 100 ? 'text-gray-500' : ''}`}>Shanghai Mode</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Timestable Duration (In Minutes)</Label>
              <Input type="number"  value={gameDuration} onChange={(event) => setGameDuration(Number(event.target.value))} placeholder="2" min={2} max={5} />
            </FormGroup>
            <FormGroup>
              <Label>Difficulty Level</Label>
              <Select
                value={difficulty}
                onChange={(e: any) => setDifficulty(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Total Allowed Players</Label>
              <Select
                value={totalAllowedPlayers}
                onChange={(e: any) => setTotalAllowedPlayers(e.target.value)}
              >
                <option value="1">1</option>
                {stoneBalance > 100 && (
                  <>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </>
                )}
              </Select>
            </FormGroup>
          </div>
     
        <div className="mt-8">
                <Button 
                    children="Create Game" 
                    onClick={handleSubmission}
                     className="flex justify-center items-center gap-2 w-full md:text-base text-sm bg-navy mx-auto font-semibold px-5 py-3  text-white transition text-center"
                />
        </div>
      </form>
      </section>
  );
};


export default CreateTimestable;
