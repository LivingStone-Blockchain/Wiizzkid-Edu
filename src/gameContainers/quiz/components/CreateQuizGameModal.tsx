import { FC, useState, useRef, useEffect, useContext } from "react";
import toast from "react-hot-toast";

import {
  FaAngleLeft,
  FaArrowRight,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import { successImg } from "../assets/images";
import Button from "./button/Button";
import FormGroup from "./forms/FormGroup";
import Input from "./forms/Input";
import Label from "./forms/Label";
import Select from "./forms/Select";
import { useNavigate } from 'react-router-dom';
import { QuizContext, QuizContextType } from "../../../context/quiz.context";


interface CreateQuizGameModalType {
  setShowCreateGameModal: any;
}



const CreateQuizGameModal: FC<CreateQuizGameModalType> = ({
  setShowCreateGameModal,
}) => {
  const navigate = useNavigate();
  const textRef = useRef<HTMLParagraphElement>(null);
  const [gameCreated, setGameCreated] = useState<boolean>(false);
  const { screen, setScreen, category, setCategory, difficulty, setDifficulty, gameDetails, setTriviaFetch, totalAllowedQuestions, setTotalAllowedQuestions, totalAllowedPlayers, setTotalAllowedPlayers, gameMode, setGameMode, gameDuration, setGameDuration, handleScreenTwo, handleInstructionScreen, user } = useContext(QuizContext) as QuizContextType;
 


  //prevent unlogged user from accessing premium
  useEffect(() => {
    if (!user?.stone_token && gameMode !== 'london') {
      toast.dismiss('unlogged');
      toast.error(`Buy Stone to play ${gameMode} mode!`, { duration: 3000, id: 'unlogged' });
      setTimeout(() => {
        toast.dismiss('unlogged');
        setGameMode('london');
      }, 3000);
    }
  },[gameMode, user]);


  //copy paste function
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

    toast.loading("Creating quiz game...", { duration: 3000, id: "loading" });

    setTimeout(() => {
      toast.dismiss("loading");
       setGameCreated(true);
      toast.success("Quiz game created successfully!");
    }, 4000);
  };



  const handleStartGame = () => {
    setGameCreated(false);
    toast.dismiss();
    navigate('/quiz', { replace: true });
    gameMode === "london" 
      ? setTriviaFetch(true)
      : setTriviaFetch(false);
  }
  


  if (gameCreated && gameDetails) {
    return (
      <section className="w-full py-4">
        <img src={successImg} className="w-24 mx-auto" alt="" />

        <article className="text-center mt-4">
          <h1 className="text-2xl font-bold text-green-600">
            Quiz Game Created!
          </h1>
      
      {gameMode !== 'london' ? (
        <>
        <p className="mt-8">
            <span className="text-xl bg-gray-200 px-4 py-2 rounded font-bold">
              {gameDetails?.invite_code}
            </span>
          </p>
          <p className="mt-8 font-semibold cursor-grab relative">
            <span ref={textRef} onClick={handleCopyClick}>{`https://game.wiizkid.com/quiz?code=${gameDetails?.invite_code}`}</span>
            <span className="text-xs font-bold animate-pulse text-green-600 absolute top-5 right-10">copy</span>
          </p>
          <p className="mt-4">
            Copy and share your quiz code or link to your friends!
          </p>
        </>
      ) : (
        <>
           <p className="mt-8">
            <span className="text-xl bg-gray-200 px-4 py-2 rounded font-bold">
              Free Mode
            </span>
          </p>
           <p className="mt-8">
            Game codes/links can be generated and shared in premium modes!
          </p>
        </>
      )}

          <Button
            onClick={handleStartGame}
            className={`mx-auto mt-14`}
          >
            Play Quiz
          </Button>
        </article>
      </section>
    );
  }



  return (
    <section className="pb-4 w-full">
      <div className="mb-7 flex items-center justify-between">
        {screen === 2 ? (
          <Button type="button" onClick={() => setScreen(1)} btnDefault>
            <FaAngleLeft className="mr-1" /> Back
          </Button>
        ) : (
          <span></span>
        )}

        <FaTimes
          onClick={handleCloseModal}
          className="float-right text-red-600 cursor-pointer text-xl"
        />
      </div>

      {screen !== 2 && (
        <article>
          <h1 className="text-2xl font-bold mb-3 bg-gradient-to-r from-orange-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
            Create A New Wiizkid Revolution!
          </h1>

          <p className="">Start A Quiz Game</p>
        </article>
      )}

      <form onSubmit={handleSubmit} className="mt-8">
        {screen === 1 && (
          <div>
            <FormGroup>
              <Label>Select Game Mode</Label>
              <Select
                  value={gameMode}
                  onChange={(e: any) => setGameMode(e.target.value)}
              >
                <option value="london">London Mode</option>
                <option value="beijing" className={`${!user?.stone_token ? 'text-gray-500' : ''}`}>Beijing Mode</option>
                <option value="shanghai" className={`${!user?.stone_token ? 'text-gray-500' : ''}`}>Shanghai Mode</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Select a category</Label>
              <Select
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
              >
                {gameMode === "london" ? (
                  <>
                    <option value="7">Science</option>
                    <option value="8">General Knowledge</option>
                    <option value="9">Sport & Leisure</option>
                    <option value="10">Geography</option>
                    <option value="11">Society & Culture</option>
                    
                  </>
                ) : (
                  <>
                    <option value="1">Football</option>
                    <option value="2">Current Affairs</option>
                    <option value="3">Nollywood</option>
                    <option value="4">Music</option>
                    <option value="5">Gossip/Gist</option>
                    <option value="6">Religion</option>
                  </>
                )}
              </Select>
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

          </div>
        )}

        {screen === 2 && (
          <div>

            <FormGroup>
              <Label>Total Allowed Questions</Label>
              <Input type="number" value={totalAllowedQuestions} onChange={(event) => setTotalAllowedQuestions(Number(event.target.value))} placeholder="Maximum of 20 questions" min={5} max={20} />
            </FormGroup>

            <FormGroup>
              <Label>Total Allowed Players</Label>
              <Select
                value={totalAllowedPlayers}
                onChange={(e: any) => setTotalAllowedPlayers(e.target.value)}
              >
                <option value="1">1</option>
                {user?.stone_token && (
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

            

            <FormGroup>
              <Label>Game Duration (In Minutes)</Label>
              <Input type="number"  value={gameDuration} onChange={(event) => setGameDuration(Number(event.target.value))} placeholder="5" min={5} max={10} />
            </FormGroup>
          </div>
        )}
        
        {/* <FormGroup>
          <Label>Game Region</Label>
          <Input type="text" placeholder="E.g. UK" />
        </FormGroup> */}

        <div className="mt-8">
          {screen === 1 && (
            <Button onClick={handleScreenTwo}>
              Next <FaArrowRight className="ml-3" />
            </Button>
          )}

          {screen === 2 && (
            <Button type="submit" className="w-full" onClick={handleInstructionScreen}>
              Create Quiz
            </Button>
          )}
        </div>
      </form>
    </section>
  );
};

// region (optional)

export default CreateQuizGameModal;
