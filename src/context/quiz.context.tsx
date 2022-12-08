import { createContext, FC, useState, useRef, useEffect, useContext } from "react";
import service from "../gameContainers/quiz/services/services";
import axios from 'axios';
import { needForSpeedMusic } from "../gameContainers/quiz/assets/audios";
import useSound from 'use-sound';
import categoryStrings from '../gameContainers/quiz/components/functions/categoryStringConveter';
import { useLocation } from 'react-router-dom';
import { UserContext, UserContextType } from './user.context';



type questionsData = {
  category: number,
  correctAnswer: string,
  difficulty: string,
  id: number | string,
  incorrectAnswers: string[],
  question: string,
  region?: string,
  tags: string[],
}

//expected object key types from backend
//some keys made optional for unlogged users payload
type returnedDataType = {
  id?: string,
  invite_code?: string,
  correctAnswer?: string,
  difficulty: string,
  total_questions: number,
  total_players: number,
  game_mode: string,
  game_duration: number,
  category: number,
}


type userType = {
  email: string,
  tokens: {
      access: string,
      refresh: string,
  },
  full_name: string,
  stone_token: number,
  id: number,
}


export interface QuizContextType {
  submitTimeRef: any,
  timeOfStart: any;
  startGame: (date: any) => void,
  quizData: questionsData[] | undefined,
  setQuizData:React.Dispatch<React.SetStateAction<questionsData[] | undefined>>, 
  selectedOption: number | string,
  setSelectedOption: React.Dispatch<React.SetStateAction<number | string>>,
  addAnswer: (payload: { questionId: string; option: string }) => void;
  score: number,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  screen: number,
  setScreen: React.Dispatch<React.SetStateAction<number>>,
  category: string,
  setCategory: React.Dispatch<React.SetStateAction<string>>,
  difficulty: string,
  setDifficulty: React.Dispatch<React.SetStateAction<string>>,
  totalAllowedQuestions: number,
  setTotalAllowedQuestions: React.Dispatch<React.SetStateAction<number>>,
  totalAllowedPlayers: number,
  setTotalAllowedPlayers: React.Dispatch<React.SetStateAction<number>>,
  gameMode: string,
  setGameMode: React.Dispatch<React.SetStateAction<string>>,
  gameDuration: number,
  setGameDuration: React.Dispatch<React.SetStateAction<number>>,
  gameDetails: returnedDataType | undefined,
  setGameDetails: React.Dispatch<React.SetStateAction<returnedDataType | undefined>>,
  triviaFetch: boolean,
  setTriviaFetch: React.Dispatch<React.SetStateAction<boolean>>,
  gameCreated: boolean,
  setGameCreated: React.Dispatch<React.SetStateAction<boolean>>,
  handleScreenTwo: () => void,
  handleInstructionScreen: () => void,
  showSplashScreen: boolean,
  setShowSplashScreen: React.Dispatch<React.SetStateAction<boolean>>,
  showCreateGameModal: boolean,
  setShowCreateGameModal: React.Dispatch<React.SetStateAction<boolean>>,
  start: boolean,
  setStart: React.Dispatch<React.SetStateAction<boolean>>,
  user: userType | null,
}




enum GameModes {
  london = "london",
  beijing = "beijing",
  shanghai = "shanghai"
}

export const QuizContext = createContext<QuizContextType | null>(null);


const QuizProvider: FC<any> = ({ children }) => {
  const submitTimeRef = useRef<HTMLSpanElement>(null);
  const [selectedOption, setSelectedOption] = useState<string | number>("");
  const [timeOfStart, setTimeOfStart] = useState<any>();
  const [screen, setScreen] = useState(1);
  const [difficulty, setDifficulty] = useState<string>("easy");
  const [totalAllowedQuestions, setTotalAllowedQuestions] = useState<number>(20);
  const [totalAllowedPlayers, setTotalAllowedPlayers] = useState<number>(1);
  const [gameMode, setGameMode] = useState<string>(GameModes.london);
  const [gameDuration, setGameDuration] = useState<number>(5);
  const [score, setScore] = useState<number>(0);
  const [quizData, setQuizData] = useState<questionsData[] | undefined>();
  const [gameCreated, setGameCreated] = useState<boolean>(false);
  const [triviaFetch, setTriviaFetch] = useState<boolean>(false);
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
  const [start, setStart] = useState<boolean>(false);
  const [play, { stop, sound }] = useSound(needForSpeedMusic, { volume: 0.5 });
  const [category, setCategory] = useState<string>("");
  const [gameDetails, setGameDetails] = useState<returnedDataType | undefined>();
  const [showCreateGameModal, setShowCreateGameModal] = useState<boolean>(false);
  const location = useLocation();
  //get user details from userContext
  const { user } = useContext(UserContext) as UserContextType;


  //reset initial category value based game mode changes
  useEffect(() => {
    let categoryInitialVal =  gameMode === "london" ? "7" : "1";
    setCategory(categoryInitialVal);
  }, [gameMode])


  //fetch data from endpoint
  let triviaUrl =  `https://the-trivia-api.com/api/questions?categories=${categoryStrings(Number(category))}&limit=${totalAllowedQuestions}&difficulty=${difficulty}`;


  useEffect(() => {
   
    const fetchQuestion = async () => {

      try {
      triviaFetch ?
          await axios.get(triviaUrl).then((res) => {
            setQuizData(res.data)
       })
       :
        await service.getAll().then((res) => {
          setQuizData(res);
        })
 
      } catch (error) {
        console.log(error)
      }
    }

    fetchQuestion();
  }, [triviaFetch])


 
//fade into oblivion on game start
useEffect(() => {
  if (!showSplashScreen && location.pathname === '/quiz-home') {
    play();
  }
  else if ( location.pathname === '/quiz' && start) {
    sound.fade(0.5, 0, 9000)
  }
  else return;
}, [showSplashScreen, start, location.pathname]);



//function create game form 1
  const handleScreenTwo = () => {
    setScreen(2)
  }


  //function create game form 2
  const handleInstructionScreen = async () => {

    const payload = {
      difficulty,
      total_questions: totalAllowedQuestions,
      total_players: Number(totalAllowedPlayers), 
      game_mode: gameMode,
      game_duration: gameDuration,
      category: Number(category),
      creator: user?.id,
    }
    
    //persist only logged user data to backend
    try {
      user?.stone_token
      ? await service.createGame(payload).then((res) => {
        setGameDetails(res); 
      })
      : setGameDetails(payload);
    } catch (error) {
      console.log(error);
    }
  }



  // function to start a game:
  const startGame = (date: any) => {
    setTimeOfStart(date);
    return;
  };



  // when an option is selected compare with correct answer in database and affect score:
  const addAnswer = (payload: { questionId: string; option: string }) => {

    const answer = quizData?.find(item => (item.id) === payload.questionId)
   

      if (answer?.correctAnswer === payload.option) {
        return setScore(score + 1)
      }
     
  };


  return (
    <QuizContext.Provider
      value={{ quizData, setQuizData, start, setStart, score, setScore, addAnswer, timeOfStart, triviaFetch, setTriviaFetch, startGame, selectedOption, setSelectedOption, screen, setScreen, category, setCategory, difficulty, setDifficulty, totalAllowedQuestions, setTotalAllowedQuestions, totalAllowedPlayers, setTotalAllowedPlayers, gameMode, setGameMode, gameDuration, setGameDuration, showSplashScreen, setShowSplashScreen, handleScreenTwo, handleInstructionScreen, submitTimeRef, gameDetails, setGameDetails, user, gameCreated, setGameCreated, showCreateGameModal, setShowCreateGameModal}}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
