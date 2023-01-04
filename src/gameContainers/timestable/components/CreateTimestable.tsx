import { FC, useState, useRef, useEffect, useContext } from "react";
import toast from "react-hot-toast";

import {
  FaAngleLeft,
  FaArrowRight,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import { successImg } from "../assets/images";
import Button from "./Button";
import FormGroup from "./forms/FormGroup";
import Input from "./forms/Input";
import Label from "./forms/Label";
import Select from "./forms/Select";
import { TimestableContext, TimestableContextType } from "../../../context/timestable.context";



type CreateTimestableType =  {
  setShowCreateGameModal: any
}



const CreateTimestable: FC<CreateTimestableType> = ({
  setShowCreateGameModal,
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { gameCreated, setGameCreated, gameDuration, setGameDuration, gameMode, setGameMode, difficulty, setDifficulty, handlePlayTimestable , handleSubmission,  totalAllowedPlayers, setTotalAllowedPlayers, gameDetails, setGameDetails } = useContext(TimestableContext) as TimestableContextType;


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
        <img src={successImg} className="w-24 mx-auto" alt="" />

        <article className="text-center mt-4">
          <h1 className="text-2xl font-bold text-green-600">
            Timestable Created!
          </h1>
      
          {gameMode !== "london" && (
          <>
            <p className="mt-8">
            <span className="text-xl bg-gray-200 px-4 py-2 rounded font-bold">
            {gameDetails?.invite_code}
            </span>
          </p>
          <p className="mt-8 font-semibold cursor-grab relative">
            <span ref={textRef} onClick={handleCopyClick}>{`https://game.wiizkid.com/quiz?code=cz19x0`}</span>
            <span className="text-xs font-bold animate-pulse text-green-600 absolute top-5 right-10">copy</span>
          </p>
          <p className="mt-4">
            Copy and share your quiz code or link to your friends!
          </p>
          </>
    )}

          <Button
            value="Play Timestable"
            onClick={handlePlayTimestable}
            className="mx-auto mt-8"
          />
        </article>
      </section>
    );
  }

  return (
    <section className="pb-4 w-full">
        <article className="relative">
          <h1 className="text-2xl font-bold mb-3 bg-gradient-to-r from-orange-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            Create A New Wiizkid Revolution!
          </h1>
          <FaTimes
          onClick={handleCloseModal}
          className="float-right text-red-600 cursor-pointer text-xl absolute top-1 right-0"
        />

          <p className="">Start Timestable</p>
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
                <option value="beijing">Beijing Mode</option>
                <option value="shanghai">Shanghai Mode</option>
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
              </Select>
            </FormGroup>
          </div>
     
        <div className="mt-8">
                <Button 
                    value="Create Game" 
                    onClick={handleSubmission}
                />
        </div>
      </form>
      </section>
  );
};


export default CreateTimestable;
