import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { ArrowRight } from "lucide-react";
import { learner } from "../assets/images";
import { Button } from "../../../components";

import Overlay from "../components/Overlay";
import { TimestableContext, TimestableContextType } from "../../../context/timestable.context";
import service from "../services/services";
import TimestableGame  from "../components/timestable-game/TimestableGame";


type PlayerTrackerType = {
  total_players: number,
  current_players: number
}

export default function QuizPlay() {
  const { setScore, start, setStart, gameDetails } = useContext(TimestableContext) as TimestableContextType;
  const [playerTracker, setPlayerTracker] = useState<PlayerTrackerType | undefined>();
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    if (gameDetails?.current_players !==  gameDetails?.total_players) {

      const intervalId = setInterval(async () => {
      try {
        await service.playersTracker(gameDetails?.id!).then(res => setPlayerTracker(res));
      } catch (error) {
        
      }
    }, 2000);

    return () => clearInterval(intervalId);
    }
  }, [gameDetails]);




  const handleStartGame = () => {

    setLoading(true);
    toast.loading("Preparing to start game...", { duration: 3000, id: "prepping" });

    setScore(0);

    setTimeout(() => {
      toast.dismiss("prepping");
      setLoading(false);
      setStart(true);
      toast.success(<span className="text-sm">Your Wiizzkid quiz game has begun!</span>, { id: "begin", duration: 3000 });
    }, 3000)

  };





if (gameDetails?.game_mode === "london") {
    return (
      <main>
      <Overlay loading={loading} />
   
      <TimestableGame showModal={start} />

      <section
        className="flex w-full h-full min-h-screen p-6 "
        style={{
          backgroundImage: `url(${learner})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-gradient-to-r from-navyLight via-navyLight to-[#a5a6c8] blur-3xl fixed w-full h-full top-0 right-0 left-0 bottom-0"></div>

        <div className="mx-auto max-w-lg text-sm shadow border border-navy p-6 rounded bg-white rounded-tl-xl rounded-br-xl relative w-full">
              <article className="text-gray-700">
            <h1 className="md:text-2xl text-xl font-bold mb-4 text-navy">Timestable<span className="text-tomato">{` (${gameDetails.difficulty[0].toUpperCase()}${gameDetails.difficulty.slice(1)})`}</span></h1>
            <p className="text-gray-700 space-x-5 my-3 md:text-lg text-base leading-relaxed font-medium">Instructions:</p>

            <p className="mb-2 text-gray-600 my-3 md:text-base text-sm leading-relaxed">
              This is Mathematical timestable game. Each question has one
              point. Attempt to answer as many questions as possible before the selected <span className="font-bold">{gameDetails.game_duration}</span>  minutes timespan elapses.
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
            className="flex justify-center items-center gap-2 md:w-48 w-40 md:text-base mt-8 text-sm bg-navy font-semibold px-5 py-3  text-white transition text-center"
          >
            Start Quiz <ArrowRight className="ml-3" />
          </Button>
          </div>
      </section>
    </main>
    )
  }

 



 



  return (
    <main>
      <Overlay loading={loading} />
      {/* game modal containing quiz questions: */}
      <TimestableGame showModal={start} />

      <section
        className="flex w-full h-full min-h-screen p-6 "
        style={{
          backgroundImage: `url(${learner})`,
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
            <h1 className="md:text-2xl text-xl font-bold mb-4 text-navy">Timestable<span className="text-tomato">{` (${gameDetails?.difficulty[0].toUpperCase()}${gameDetails?.difficulty.slice(1)})`}</span></h1>
            <p className="text-gray-700 space-x-5 my-3 md:text-lg text-base leading-relaxed font-medium">Instructions:</p>

            <p className="mb-2 text-gray-600 my-3 md:text-base text-sm leading-relaxed">
              This is a Mathematical timestable game. Each question has one
              point. Attempt to answer as many questions as possible before the selected <span className="font-bold">{gameDetails?.game_duration}</span>  minutes timespan elapses.
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
            className={`flex justify-center items-center gap-2 md:w-48 w-40 md:text-base mt-8 text-sm bg-navy font-semibold px-5 py-3  text-white transition text-center ${playerTracker?.current_players === playerTracker?.total_players ? 'pointer-events-auto' : 'pointer-events-none'}`}
          >
            Start Quiz <ArrowRight className="ml-3" />
          </Button>
            </>
          ) : (
            <article className="text-gray-700 space-y-12">
            <p className="text-gray-700 space-x-5 my-3 md:text-lg text-base leading-relaxed font-medium text-center">Successfully joined the game!</p>

            <div className="mb-2 text-gray-600 my-3 md:text-base text-sm leading-relaxed flex items-center justify-center flex-col gap-16">
              <p>Waiting for</p> 
              <p className= "h-16 w-16 bg-navy rounded-full flex justify-center items-center animation-pulse text-white font-bold md:text-lg text-base">{playerTracker!.total_players - playerTracker!.current_players === -1 ? 1 : playerTracker!.total_players - playerTracker!.current_players}</p>
              <p> more  {(playerTracker!.total_players - playerTracker!.current_players === 1) ? "player" : "players"}...</p>
            </div>
            </article>
          )}
        </div>
      </section>
    </main>
  );
}
