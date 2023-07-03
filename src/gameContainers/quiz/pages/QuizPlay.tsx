import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { eduImg } from "../assets/images";
import  Button from "./../components/button/Button";
import categoryStrings from "../components/functions/categoryStringConveter";
import Overlay from "../components/Overlay";
import QuizGame from "../components/quiz-game/QuizGame";
import { QuizContext, QuizContextType } from "../../../context/quiz.context";
import { TokenContext, TokenContextType } from "../../../context/token.context";
import { UserContext, UserContextType } from "../../../context/user.context";
import service from "../services/services";
import gameProcessionAlert from "../components/toasts/GameProcessionAlert";



type PlayerTrackerType = {
  total_players: number,
  current_players: number
}

export default function QuizPlay() {
  const { startGame, setScore, start, setStart, gameDetails, user, allowGameProcession, setAllowGameProcession } = useContext(QuizContext) as QuizContextType;
  const { loading, firstApproval, secondApproval, setSecondApproval } = useContext(TokenContext) as TokenContextType;
  const { refreshedUser } = useContext(UserContext) as UserContextType;
  const [playerTracker, setPlayerTracker] = useState<PlayerTrackerType | undefined>();
  const [loader, setLoader] = useState<boolean>(false);



//if second Approval is true it means your transaction is successful
//As the creator wait for 3 minutes for others, if anyone is left, pop up message
//Exclude londoners from pop.
useEffect(() => {
  let timeoutId:any = null;
  if (secondApproval && playerTracker?.current_players !== gameDetails?.total_players && gameDetails?.creator === user?.id && gameDetails?.game_mode !== "london") {
    timeoutId = setTimeout(() => {
      toast.dismiss();
        gameProcessionAlert(setLoader, setAllowGameProcession); 
    }, 300000); //5mins
  }
 
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };
}, [secondApproval]);




//equate total players to current players on clicking yes for game progression
useEffect(() => {
  const updatePatch = async () => {
    if (allowGameProcession && playerTracker?.current_players) {
      setSecondApproval(false);

      const payload = {
        total_players: playerTracker.current_players,
      };

      try {
        await service.currentPayerUpdate(gameDetails?.id!, payload, refreshedUser?.access!);
      } catch (error) {
        console.log(error);
      }
    }
  };

  updatePatch();
}, [allowGameProcession]);



//if joining players are incomplete, keep revisiting the BE, else set second approval to false so it wont pop.
useEffect(() => {
  if (playerTracker?.current_players !== gameDetails?.total_players) {
    const intervalId = setInterval(async () => {
      try {
        const updatedPlayerTracker = await service.playersTracker(gameDetails?.id!);
        setPlayerTracker(updatedPlayerTracker);
      } catch (error) {
        // Handle the error if needed
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }
}, [playerTracker]);





  const handleStartGame = () => {

    setLoader(true);
    toast.loading("Preparing to start quiz...", { duration: 3000, id: "prepping" });

    setScore(0);
    setSecondApproval(false);
    setTimeout(() => {
      toast.dismiss("prepping");
      toast.dismiss("username");
      setLoader(false);
      setStart(true);
      startGame(Date.now());
      toast.success(<span className="text-sm">Your Wiizzkid quiz game has begun!</span>, { id: "begin" });
    }, 3000)

  };







if (gameDetails?.game_mode === "london") {
    return (
      <main>
      <Overlay loading={loader} /> 
      <QuizGame showModal={start} />


      <section
        className="flex w-full h-full min-h-screen p-6 "
        style={{
          backgroundImage: `url(${eduImg})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-gradient-to-r from-navyLight via-navyLight to-[#a5a6c8] blur-3xl fixed w-full h-full top-0 right-0 left-0 bottom-0"></div>

        <div className="mx-auto max-w-lg text-sm shadow border border-navy p-6 rounded bg-white rounded-tl-xl rounded-br-xl relative w-full">
              <article className="text-gray-700">
            <h1 className="md:text-2xl text-xl font-bold mb-4 text-navy">{`${(categoryStrings(Number(gameDetails.category))[0]).toUpperCase()}${categoryStrings(Number(gameDetails.category)).slice(1)} Quiz`} <span className="text-tomato">{` (${gameDetails.difficulty[0].toUpperCase()}${gameDetails.difficulty.slice(1)})`}</span></h1>
            <p className="text-gray-700 space-x-5 my-3 md:text-lg text-base leading-relaxed font-medium">Quiz Instructions:</p>

            <p className="mb-2 text-gray-600 my-3 md:text-base text-sm leading-relaxed">
              There are <span className="font-bold">{gameDetails.total_questions}</span> multiple choice questions. Each question has one
              point. Attempt to answer all the questions within <span className="font-bold">{gameDetails.game_duration}</span>  minutes.
            </p>

            <p className="mb-2 text-gray-600 space-x-5 my-3 md:text-base text-sm leading-relaxed">
              Your game score will be calculated based on how many questions you
              answered correctly and the winner will be the player with the
              highest score and quickest to submit.
            </p>

            <p className="font-bold mt-8 text-navy">
              <span className="text-xl">Ready</span> to join the Wiizkid
              revolution? Proceed.
            </p>
          </article>

          <Button
            onClick={handleStartGame}
            className="flex justify-center items-center gap-2 md:w-48 w-36 md:text-base mt-8 text-sm bg-navy font-semibold px-5 py-3  text-white transition text-center"
          >
            Start Quiz <FaArrowRight className="ml-3" />
          </Button>
          </div>
      </section>
    </main>
    )
  }

 
 
console.log(gameDetails)


  return (
    <main>
      <Overlay loading={loader} />
     {/* game modal containing quiz questions: */}
      <QuizGame showModal={start} />
     
      <section
        className="flex w-full h-full min-h-screen p-6 "
        style={{
          backgroundImage: `url(${eduImg})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-gradient-to-r from-navyLight via-navyLight to-[#a5a6c8] blur-3xl fixed w-full h-full top-0 right-0 left-0 bottom-0"></div>

        <div className="mx-auto max-w-lg text-sm shadow border border-navy p-6 rounded bg-white rounded-tl-xl rounded-br-xl relative w-full">
          {(playerTracker?.current_players === playerTracker?.total_players) 
          ? (
            <>
              <article className="text-gray-700">
              <div className="flex justify-between items-center mb-4">
              <h1 className="md:text-2xl text-xl font-bold text-navy">{`${(categoryStrings(Number(gameDetails?.category))[0]).toUpperCase()}${categoryStrings(Number(gameDetails?.category)).slice(1)} Quiz`} <span className="text-tomato">{` (${gameDetails?.difficulty[0].toUpperCase()}${gameDetails?.difficulty.slice(1)})`}</span></h1>
              <p className="font-bold text-navy">Token: {gameDetails?.stone_token_fee} STN</p>
              </div>
            <p className="text-gray-700 space-x-5 my-3 md:text-lg text-base leading-relaxed font-medium">Quiz Instructions:</p>

            <p className="mb-2 text-gray-600 my-3 md:text-base text-sm leading-relaxed">
              There are <span className="font-bold">{gameDetails?.total_questions}</span> multiple choice questions. Each question has one
              point. Attempt to answer all the questions within <span className="font-bold">{gameDetails?.game_duration}</span>  minutes.
            </p>

            <p className="mb-2 text-gray-600 space-x-5 my-3 md:text-base text-sm leading-relaxed">
              Your game score will be calculated based on how many questions you
              answered correctly and the winner will be the player with the
              highest score and quickest to submit.
            </p>


            <p className="font-bold mt-8 text-navy">
              <span className="text-xl">Ready</span> to join the Wiizkid
              revolution? Proceed.
            </p>
          </article>

            <div className="flex md:flex-row flex-col justify-start md:items-center items-start gap-5 mt-8">
              <Button 
              type='button'
              onClick={handleStartGame}
              disabled={loading}
              className={`flex items-center justify-center ${loading ? 'sm:w-64 w-48' : 'sm:w-56 w-44'} text-white text-sm font-semibold px-5 py-3 ${loading ? "cursor-not-allowed bg-[#37385e]" : "cursor-pointer bg-navy"}`}
              >
                {loading && (<svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>)}
                    <span className={`relative flex items-center justify-center md:text-base text-sm font-semibold ${loading ? " text-gray-200" : " text-white"}`}>{loading ? "Processing Fee" : `Start Quiz`}{!loading && <FaArrowRight className="ml-3" />}</span>
              </Button> 

              {loading ? <p className="text-xs animate-pulse text-navy italic">{firstApproval ? "Confirm Transaction in Metamask" : "One more confirmation. Please wait..."}</p> : <p className="text-xs animate-pulse text-teal italic flex items-center justify-center gap-3"><span>Transaction Completed</span> <FaCheck /></p>}
            </div>

            </>
          ) : (
            <article className="text-gray-700 space-y-12">
            <p className="text-gray-700 space-x-5 my-3 md:text-lg text-base leading-relaxed font-medium text-center">Successfully joined the game!</p>

            <div className="mb-2 text-gray-600 my-3 md:text-base text-sm leading-relaxed flex items-center justify-center flex-col gap-16">
              <p>Waiting for</p> 
              {playerTracker && (
                <>
                  <p className= "h-16 w-16 bg-navy rounded-full flex justify-center items-center animation-pulse text-white font-bold md:text-lg text-base">{playerTracker.total_players - playerTracker.current_players === -1 ? 1 : playerTracker.total_players - playerTracker.current_players}</p>
                  <p> more  {(playerTracker.total_players - playerTracker.current_players === 1) ? "player" : "players"}...</p>
                </>
              )}
          </div>
            </article>
          )}
        </div>
      </section>
    </main>
  );
}
