import { FC, useState, useRef, useEffect, useContext } from "react";
import toast from "react-hot-toast";

import {
  FaAngleLeft,
  FaArrowRight,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import { successImg, beijing } from "../assets/images";
import Button from "./button/Button";
import FormGroup from "./forms/FormGroup";
import Input from "./forms/Input";
import Label from "./forms/Label";
import Select from "./forms/Select";
import { useNavigate } from 'react-router-dom';
import { QuizContext, QuizContextType } from "../../../context/quiz.context";
import { TokenContext, TokenContextType } from '../../../context/token.context';
import { utils } from "ethers";



const categoryData = [
  {
    id: 2,
    category: "Arts & Literature"
  },
  {
    id: 3,
    category: "Film & Tv"
  },
  {
    id: 4,
    category: "Food & Drink"
  },
  {
    id: 5,
    category: "General Knowledge"
  },
  {
    id: 6,
    category: "Geography"
  },
  {
    id: 7,
    category: "History"
  },
  {
    id: 8,
    category: "Music"
  },
  {
    id: 9,
    category: "Science"
  },
  {
    id: 10,
    category: "Society & Culture"
  },
  {
    id: 11,
    category: "Sport & Leisure"
  }
]


interface CreateQuizGameModalType {
  setShowCreateGameModal: React.Dispatch<React.SetStateAction<boolean>>
}



const CreateQuizGameModal: FC<CreateQuizGameModalType> = ({
  setShowCreateGameModal,
}) => {
  const navigate = useNavigate();
  const textRef = useRef<HTMLParagraphElement>(null);
  const { screen, setScreen, category, setCategory, difficulty, setDifficulty, gameDetails, setTriviaFetch, totalAllowedQuestions, setTotalAllowedQuestions, totalAllowedPlayers, setTotalAllowedPlayers, gameMode, setGameMode, gameDuration, setGameDuration, handleScreenTwo, handleInstructionScreen, gameCreated, setGameCreated, tokenFee, setTokenFee, user, setTryLondon } = useContext(QuizContext) as QuizContextType;
  const { stBalance } = useContext(TokenContext) as TokenContextType;
  const stoneBalance = Number(utils.formatEther(stBalance));
  const [showBeijingModal, setShowBeijingModal] = useState<boolean>(false);
 


  
  useEffect(() => {
    //prevent user with low balance from accessing shanghai
    if (stoneBalance < 10 && gameMode === 'shanghai' ) {
      toast.dismiss('unlogged');
      toast.error(<span className="text-sm">Buy Stone to play Shanghai mode!</span>, { duration: 3000, id: 'unlogged' });
      setTimeout(() => {
        toast.dismiss('unlogged');
        setGameMode('london');
      }, 3000);
    }
  
  },[gameMode, stoneBalance]);





  //toast beijing message on click
  //go to login if user isn't logged in while trying to use shanghai
  useEffect(() => {
    gameMode === 'beijing' 
      ? setShowBeijingModal(true)
      : setShowBeijingModal(false)

    if (gameMode === "shanghai" && !user) {
      toast.error(<span className="text-sm">Only signed in users can play Shanghai</span>, { duration: 3000, id: 'unlogged' })
      setTimeout(() => {
        toast.dismiss('unlogged');
        setGameMode('london');
      }, 3000);
    }
      
  }, [showBeijingModal, gameMode])





  //copy paste function
  const handleCopyClick = async () => {
    //exec command for older browsers
    ("clipboard" in navigator)
    ? await navigator.clipboard.writeText(textRef.current!.innerText)
    : document.execCommand("copy", true, textRef.current?.innerText);
   
    toast.success("Details copied successfully!");
  }


  const handleCloseModal = () => {
    setShowCreateGameModal(false);
    setTryLondon(false);
    toast.dismiss();
    return;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading("Creating quiz game...", { duration: 3000, id: "loading" });
  };



  const handleStartGame = () => {
    setGameCreated(false);
    toast.dismiss();
    gameMode === "london" 
      ?   navigate('/quiz', { replace: true })
      :   navigate(`/quiz?code=${gameDetails?.invite_code}`, { replace: true });

    gameMode === "london" 
      ? setTriviaFetch(true)
      : setTriviaFetch(false);
  }
  


  if (gameCreated && gameDetails) {
    return (
      <section className="w-full py-4">
        <img src={successImg} className="w-24 mx-auto" alt="success" />

        <article className="text-center mt-4">
            <h1 className="text-2xl font-bold text-teal">
            Quiz Game Created!
          </h1>
      
      {(gameMode !== 'london' && totalAllowedPlayers === 1) ? (
          <>
             <p className="mt-8">
              <span className="text-xl bg-gray-200 px-4 py-2 rounded font-bold text-navy">
                Single Player
              </span>
            </p>
             <p className="mt-8 text-gray-500 space-x-5 my-3 md:text-base text-sm leading-relaxed">
              Game codes/links can be generated and shared in multiplayer mode!
            </p>
          </>
        ) : (gameMode !== 'london' && totalAllowedPlayers > 1) ? (
        <>
        <p className="mt-8 relative">
            <span className="text-xl bg-gray-200 px-4 py-2 rounded font-bold text-navy hover:bg-gray-300"  ref={textRef}>
              {gameDetails?.invite_code}
            </span>
            <span className="text-xs font-bold animate-pulse text-teal absolute top-2 right-10 cursor-grab" onClick={handleCopyClick}>copy</span>
          </p>
          <p className="mt-8 font-semibold cursor-grab relative hidden">
            <span >{`https://wiizzkid.com/quiz?code=${gameDetails?.invite_code}`}</span>
            <span className="text-xs font-bold animate-pulse text-teal absolute top-3 right-15">copy</span>
          </p>
          <p className="mt-8 text-gray-500 space-x-5 my-3 md:text-base text-sm leading-relaxed">
            Copy and share your quiz code with friends!
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
            onClick={handleStartGame}
            className="mt-14 flex justify-center items-center gap-2 w-full md:text-base text-sm bg-navy mx-auto font-semibold px-5 py-3  text-white transition text-center"
          >
            Play Quiz
          </Button>
        </article>
      </section>
    );
  }


  if (showBeijingModal) {
    return (
      <section className={`relative w-full py-4`}>
              <FaTimes
                onClick={() => {setShowBeijingModal(false); setGameMode('london')}}
                className="absolute top-2 right-2 text-tomato cursor-pointer md:text-xl text-lg"
                />
              <img src={beijing} className="w-24 mx-auto" alt="beijing" />

              <article className="text-center mt-4">
                <h1  className="text-2xl font-bold text-teal">
                Contact us!
                </h1>
            </article>
            
            <p className="mt-8 text-gray-500 text-center space-x-5 my-3 md:text-base text-sm leading-relaxed">
            This a B2B mode where organizations or schools develop their own learning platform or quiz templates in our metaverse.
            </p>

            <Button
                className="flex justify-center mx-auto items-center gap-2 md:w-48 w-36 md:text-base text-sm bg-navy font-semibold px-5 py-3  text-white transition text-center mt-8"
              onClick={() => {toast.dismiss(); setShowCreateGameModal(false); navigate('/about'); setGameMode('london')}}
            >
              Contact
            </Button>
                  
        </section>
    )
  }



  return (
    <section className={`pb-4 w-full ${showBeijingModal ? 'hidden' : 'block'}`}>
      <div className="mb-7 flex items-center justify-between">
        {screen === 2 ? (
          <Button type="button" className="text-navy" onClick={() => setScreen(1)} btnDefault>
            <FaAngleLeft className="mr-1" /> Back
          </Button>
        ) : (
          <span></span>
        )}

        <FaTimes
          onClick={handleCloseModal}
          className="float-right text-tomato cursor-pointer md:text-xl text-lg"
        />
      </div>

      {screen !== 2 && (
        <article>
          <h1 className="md:text-2xl text-xl font-bold mb-3 text-navy">Create a new Wiizzkid<span className="text-tomato block">Revolution!</span></h1>
          <p className={`text-gray-700 space-x-5 my-3 md:text-lg text-base leading-relaxed font-medium ${gameMode === 'shanghai' && 'hidden'}`}>Start a Quiz Game</p>
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
                <option value="shanghai" className={`${stoneBalance < 10 ? 'text-gray-500' : ''}`}>Shanghai Mode</option>
                <option value="beijing" className={`${stoneBalance < 10000 ? 'text-gray-500' : ''}`}>Beijing Mode</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Select a category</Label>
              <Select
                value={category}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
              >
                {gameMode === "london" ? (
                  <>
                    <option value="9">Sport & Leisure</option>
                    <option value="11">Society & Culture</option>
                    <option value="13">Science</option>
                    <option value="14">General Knowledge</option>
                    <option value="15">Geography</option>
                  </>
                ) : (
                  <>
                    {categoryData.map(({id, category}) => (
                        <option key={id} value={id}>{category}</option>
                    ))}
                  </>
                )}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Difficulty Level</Label>
              <Select
                value={difficulty}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDifficulty(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Select>
            </FormGroup>
           
              {gameMode === "shanghai" && (
                  <FormGroup>
                  <Label>Token Amount</Label>
                  <Input type="text"  value={tokenFee} onChange={(event) => setTokenFee(event.target.value)} placeholder={difficulty === "easy" ? "10 -50 STN" : difficulty === "medium" ? "100 -500 STN" : "> 500 STN" } min={10} max={9999999999} />
                </FormGroup>
              )}
          </div>
        )}

        {screen === 2 && (
          <div>

            <FormGroup>
              <Label>Total Allowed Questions</Label>
              <Input type="Number" value={totalAllowedQuestions} onChange={(event) => setTotalAllowedQuestions(Number(event.target.value))} placeholder="Maximum of 20 questions" min={5} max={20} />
            </FormGroup>

            <FormGroup>
              <Label>Total Allowed Players</Label>
              <Select
                value={totalAllowedPlayers}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTotalAllowedPlayers(Number(e.target.value))}
              >
               <option value="1">1</option>
                {gameMode === "shanghai" && (
                  <>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </>
                )}
              </Select>
            </FormGroup>

            

            <FormGroup>
              <Label>Game Duration (In Minutes)</Label>
              <Input type="Number"  value={gameDuration} onChange={(event) => setGameDuration(Number(event.target.value))} placeholder="5" min={5} max={10} />
            </FormGroup>
          </div>
        )}
        
        {/* <FormGroup>
          <Label>Game Region</Label>
          <Input type="text" placeholder="E.g. UK" />
         </FormGroup>  
        
        */}

        <div className="mt-8">
          {screen === 1 && (
            <Button onClick={handleScreenTwo}
            className="flex justify-center items-center gap-2 w-full md:text-base text-sm bg-navy mx-auto font-semibold px-5 py-3  text-white transition text-center"
            >
              Next <FaArrowRight className="ml-3" />
            </Button>
          )}

          {screen === 2 && (
            <Button type="submit"   className="flex justify-center items-center gap-2 w-full md:text-base text-sm bg-navy mx-auto font-semibold px-5 py-3  text-white transition text-center" onClick={handleInstructionScreen}>
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
