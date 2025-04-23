import { FC, useState, useRef, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { success, beijing } from "../assets/images";
import { Button } from './button/index';
import FormGroup from "./forms/FormGroup";
import Input from "./forms/Input";
import Label from "./forms/Label";
import Select from "./forms/Select";
import { TimestableContext, TimestableContextType } from "../../../context/timestable.context";
import { TokenContext, TokenContextType } from "../../../context/token.context";
import { utils } from "ethers";
import { useNavigate } from "react-router-dom";


type CreateTimestableType =  {
  setShowCreateGameModal: any
}



const CreateTimestable: FC<CreateTimestableType> = ({
  setShowCreateGameModal,
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { setStart, setLoading, gameCreated, setGameCreated, gameDuration, setGameDuration, gameMode, setGameMode, difficulty, setDifficulty , handleSubmission,  totalAllowedPlayers, setTotalAllowedPlayers, gameDetails, setGameDetails, user, tokenFee, setTokenFee } = useContext(TimestableContext) as TimestableContextType;
  const {balanceOfStoneTokens }= useContext(TokenContext) as TokenContextType;
  const stoneBalance = Number(utils.formatEther(balanceOfStoneTokens));
  const [showBeijingModal, setShowBeijingModal] = useState<boolean>(false);
  const navigate = useNavigate();



   //prevent unlogged user from accessing premium
   useEffect(() => {
    if (stoneBalance < 10 && gameMode === 'shanghai') {
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
      toast.loading(<span className="text-sm">Not logged in! Redirecting you to sign in.</span>, { duration: 3000, id: 'unlogged' })
      setTimeout(() => {
        toast.dismiss();
        setShowCreateGameModal(false);
        navigate('/login')
      }, 3000)
    }
      
  }, [showBeijingModal, gameMode])





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


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

       //alert user if token is insufficient based on difficulty
       if (gameMode === "shanghai" && difficulty === "easy" && Number(tokenFee) <= 9) {
        return;
      }
      if (gameMode === "shanghai" && difficulty === "medium" && Number(tokenFee) <= 99) {
          toast.dismiss("low")
          return;
      }
      if (gameMode === "shanghai" && difficulty === "hard" && Number(tokenFee) <= 499) {
          toast.dismiss("low")
          return;
      }


    toast.loading("Creating game...", { duration: 3000, id: "loading" });

  };

  

 //initiate game
  const handleStartGame = () => {
    setGameCreated(false)
    toast.dismiss()

    gameMode === "london" 
    ?   navigate('/timestable', { replace: true })
    :   navigate(`/timestable?code=${gameDetails?.invite_code}`, { replace: true });
  }
  





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
            <span ref={textRef} onClick={handleCopyClick}>{`https://wiizzkid.com/quiz?code=${gameDetails?.invite_code}`}</span>
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
            onClick={handleStartGame}
            className="mt-14 flex justify-center items-center gap-2 w-full md:text-base text-sm bg-navy mx-auto font-semibold px-5 py-3  text-white transition text-center"
          />
        </article>
      </section>
    );
  }




  
  if (showBeijingModal) {
    return (
      <section className={`relative w-full py-4`}>
              <X
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
         <div className="mb-7 flex items-center justify-end">
        <X
          onClick={handleCloseModal}
          className="float-right text-tomato cursor-pointer md:text-xl text-lg"
        />
      </div>
       
        <article className="relative">
          <h1 className={`md:text-2xl text-xl font-bold mb-3 text-navy ${gameMode === 'shanghai' && 'hidden'}`}>Wiizzkid <span className="text-tomato">Revolution!</span></h1>
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
                  <option value="shanghai" className={`${stoneBalance < 10 ? 'text-gray-500' : ''}`}>Shanghai Mode</option>
                <option value="beijing" className={`${stoneBalance < 10000 ? 'text-gray-500' : ''}`}>Beijing Mode</option>
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

            {gameMode === "shanghai" && (
                  <FormGroup>
                  <Label>Token Amount</Label>
                  <Input type="text"  value={tokenFee} onChange={(event) => setTokenFee(event.target.value)} placeholder={difficulty === "easy" ? "10 -50 STN" : difficulty === "medium" ? "100 -500 STN" : "> 500 STN" } min={10} max={9999999999} />
                </FormGroup>
              )}

            <FormGroup>
              <Label>Total Allowed Players</Label>
              <Select
                value={totalAllowedPlayers}
                onChange={(e: any) => setTotalAllowedPlayers(e.target.value)}
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
