import React, { useContext, FC } from 'react'
import { cube, cubes, area, custom } from '../assets/images'
import {TimestableContext,TimestableContextType } from "../../../context/timestable.context";
import {UserContext, UserContextType} from '../../../context/user.context'
import toast from "react-hot-toast";
import CreateTimestable from './../components/CreateTimestable';
import service from '../services/services';


type QuickPlayProp = {
  handleDisplayCreateGameModal: () => void,
}

type quickPlayType = {
  id: number,
  difficulty: string,
  img: string,
  description: string,
}


const quickPlayData: quickPlayType[] = [
  {
    id: 1,
    difficulty: "Easy",
    img: cube,
    description: "Practice your way to greatness starting with the easy mode."
  },
  {
    id: 2,
    difficulty: "medium",
    img: area,
    description: "We have the platform made for you. Show What you've got!"
  },
  {
    id: 3,
    difficulty: "Hard",
    img: cubes,
    description: "Think you can be the best amongst the rest? Prove your mettle!"
  },
]



const QuickPlay: FC<QuickPlayProp> = ({ handleDisplayCreateGameModal }) => {
  const { setDifficulty, setTotalAllowedPlayers, setGameMode, setGameDuration, user, setGameDetails, setGameCreated, setShowCreateGameModal, tokenFee, setTokenFee} = useContext(TimestableContext) as TimestableContextType;
  const { refreshedUser } = useContext(UserContext) as UserContextType


  const handleQuickPlay = async (id: number) => {
    const data = quickPlayData.find((game) => game.id === id);


    setGameMode("london");
    setDifficulty('easy');
    setTotalAllowedPlayers(1);
    setGameDuration(2);
    setTokenFee("0");


    setShowCreateGameModal(true);
    setGameCreated(true);



    toast.loading("Creating game...", { duration: 4000, id: "loading" });

    setTimeout(() => {
      toast.dismiss("loading");
      toast(
        <CreateTimestable setShowCreateGameModal={setShowCreateGameModal} />,
        { duration: Infinity, id: "showModal", className: "w-full" }
      );
      toast.success("Timestable created successfully!");
      setShowCreateGameModal(true);
    }, 4000);


    const payload = {
      difficulty: "easy",
      total_players: 1,
      game_mode: "london",
      game_duration: 2,
      creator: user!.id,
      stone_token_fee: Number(tokenFee)
    }

    
    //persist only logged user data to backend
    try {
      user?.tokens
      ? await service.createGame(payload, refreshedUser?.access!).then((res) => {
        setGameDetails(res); 
      })
      : setGameDetails(payload);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container md:py-20 py-16 px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700 md:mt-20 mt-16">
      <div className="md:mb-16 mb-12 md:w-2/3 lg:w-1/2">
        <h1 className="md:text-2xl text-xl font-semibold text-navy">Quick<span className="text-tomato">play</span></h1>
        <p className="text-gray-500 space-x-5 my-3 md:text-base text-sm leading-relaxed font-medium">Explore the levels available in the London mode</p>
      </div>
      <div className="grid gap-6 px-4 sm:px-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {quickPlayData.map(({ id, difficulty, img, description }: quickPlayType) => (
          <div className="group relative rounded-xl space-y-6 overflow-hidden cursor-pointer" key={id} onClick={() => handleQuickPlay(id)}>
            <img
              className="mx-auto h-[20rem] w-full object-contain bg-navyLight object-center transition duration-500 group-hover:scale-105"
              src={img}
              alt="quick-play"
              loading="lazy"
              width="640"
              height="805"
            />
            <div className="absolute bottom-0 inset-x-0 h-max mt-auto px-8 py-6 bg-navy md:translate-y-24 translate-y-20 transition duration-300 ease-in-out group-hover:translate-y-0">
              <div>
                <h4 className="md:text-xl text-lg font-medium text-white">Timestable</h4>
                <span className="block md:text-sm text-xs text-gray-400">{difficulty}</span>
              </div>
              <p className="mt-8 md:text-base text-sm  text-gray-300">{description}</p>
            </div>

          </div>
        ))}
        <div className="group relative rounded-xl  space-y-6 overflow-hidden cursor-pointer" onClick={handleDisplayCreateGameModal}>
          <img
            className="mx-auto h-[20rem] w-full object-contain bg-navyLight object-center transition duration-500 group-hover:scale-105"
            src={custom}
            alt="quick-play"
            loading="lazy"
            width="640"
            height="805"
          />
    
          <div className="absolute bottom-0 inset-x-0 h-max mt-auto px-8 py-6 bg-navy md:translate-y-24 translate-y-20 transition duration-300 ease-in-out group-hover:translate-y-0">
              <div>
                <h4 className="md:text-xl text-lg font-medium text-white">Custom Quiz</h4>
                <span className="block md:text-sm text-xs text-gray-400">Any</span>
              </div>
              <p className="mt-8 md:text-base text-sm  text-gray-300">Create a game with your preferred selections. Get Started!</p>
            </div>

        </div>
      </div>
    </div>
  )
}

export default QuickPlay