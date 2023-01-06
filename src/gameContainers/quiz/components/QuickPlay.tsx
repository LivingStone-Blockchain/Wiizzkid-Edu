import React, { useContext, FC } from 'react'
import { eduImg, rocket, geography, general, custom, basket, soccer } from '../assets/images'
import { QuizContext, QuizContextType } from "../../../context/quiz.context";
import toast from "react-hot-toast";
import CreateQuizGameModal from './../components/CreateQuizGameModal'
import categoryStrings from './functions/categoryStringConveter';
import service from '../services/services';


type QuickPlayProp = {
  handleDisplayCreateGameModal: () => void,
}

type quickPlayType = {
  id: number,
  title: string,
  category: string,
  difficulty: string,
  img: string,
  description: string,
}


const quickPlayData: quickPlayType[] = [
  {
    id: 1,
    title: "Science",
    category: "7",
    difficulty: "Easy",
    img: rocket,
    description: "Lets go rock the Sciences with your grit and knowledge."
  },
  {
    id: 2,
    title: "General",
    category: "8",
    difficulty: "Easy",
    img: general,
    description: "Play some General Knowledge quiz. Show What you've got!"
  },
  {
    id: 3,
    title: "Sports",
    category: "9",
    difficulty: "Easy",
    img: soccer,
    description: "Think you know about the sporting and leisure terrain? Shoot!"
  },
  {
    id: 4,
    title: "Geography",
    category: "10",
    difficulty: "Easy",
    img: geography,
    description: "The universe is waiting to test your knowledge about its landscape."
  },
]



const QuickPlay: FC<QuickPlayProp> = ({ handleDisplayCreateGameModal }) => {
  const { setCategory, setDifficulty, setTriviaFetch, setTotalAllowedQuestions, setTotalAllowedPlayers, setGameMode, setGameDuration, user, setGameDetails, setGameCreated, setShowCreateGameModal } = useContext(QuizContext) as QuizContextType;


  const handleQuickPlay = async (id: number) => {
    const data = quickPlayData.find((game) => game.id === id);


    setGameMode("london");
    setCategory(data!.category);
    setDifficulty('easy');
    setTotalAllowedQuestions(10);
    setTotalAllowedPlayers(1);
    setGameDuration(5);


    setShowCreateGameModal(true);
    setGameCreated(true);



    toast.loading("Creating quiz game...", { duration: 4000, id: "loading" });

    setTimeout(() => {
      toast.dismiss("loading");
      toast(
        <CreateQuizGameModal setShowCreateGameModal={setShowCreateGameModal} />,
        { duration: Infinity, className: "w-full" }
      );
      toast.success("Quiz game created successfully!");
      setTriviaFetch(true)
      setShowCreateGameModal(true);
    }, 4000);


    const payload = {
      difficulty: "easy",
      total_questions: 10,
      total_players: 1,
      game_mode: "london",
      game_duration: 5,
      category: Number(data?.category),
      creator: user!.id,
    }

    
    //persist only logged user data to backend
    try {
      user?.tokens
      ? await service.createGame(payload).then((res) => {
        setGameDetails(res); 
      })
      : setGameDetails(payload);
    } catch (error) {
      console.log(error);
    }
  }
  //#a5a6c8
  //#34355d
  //#4a4c7e
  //#5b5c8d
  //#f07575
  //#f75858
  //#FF3939
  //#cd2525
  //#26a8a1
  //#37b9b2
  //#72c9c4
  //#98cfcc
  //#e0b00d
  //#e5bf43
  return (
    <div className="container md:py-20 py-16 px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700 md:mt-20 mt-16">
      <div className="md:mb-16 mb-12 md:w-2/3 lg:w-1/2">
        <h1 className="md:text-2xl text-xl font-semibold text-navy">Quick<span className="text-tomato">play</span></h1>
        <p className="text-gray-500 space-x-5 my-3 md:text-base text-sm leading-relaxed font-medium">Explore the categories available in the London mode</p>
      </div>
      <div className="grid gap-6 px-4 sm:px-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {quickPlayData.map(({ id, title, category, difficulty, img, description }: quickPlayType) => (
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
                <h4 className="md:text-xl text-lg font-medium text-white">{title}</h4>
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
                <span className="block md:text-sm text-xs text-gray-400">Easy</span>
              </div>
              <p className="mt-8 md:text-base text-sm  text-gray-300">Create a quiz game with your preferred selections. Get Start!</p>
            </div>

        </div>
      </div>
    </div>
  )
}

export default QuickPlay