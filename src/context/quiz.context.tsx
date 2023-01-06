import { createContext, FC, useState, useRef, useEffect, useContext, useMemo } from "react";
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
  creator?: number,
  difficulty: string,
  total_questions: number,
  total_players: number,
  game_mode: string,
  game_duration: number,
  category: number,
}


type RecentGamesData = {
 games: {
  total_questions: number,
  total_players: number,
  game_mode: string,
  game_duration: number,
  category: number,
  created_at: string,
  difficulty: string,
  id: number,
  creator: number,
  invite_code: string
 }[],
 scores: {
    player_id: number,
    game_id: string,
    score: number,
    submit_time: number
 }[]
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
  player_code: string,
}


export interface QuizContextType {
  submitTimeRef: any,
  timeOfStart: any;
  startGame: (date: any) => void,
  quizData: questionsData[] | undefined,
  setQuizData:React.Dispatch<React.SetStateAction<questionsData[] | undefined>>,
  triviaData: questionsData[] | undefined,
  setTriviaData:React.Dispatch<React.SetStateAction<questionsData[] | undefined>>,  
  dataType: questionsData[] | undefined,
  recentGames: RecentGamesData | undefined,
  setRecentGames:React.Dispatch<React.SetStateAction<RecentGamesData | undefined>>, 
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
  questionsLoader: boolean,
  setQuestionsLoader: React.Dispatch<React.SetStateAction<boolean>>,
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
  const [recentGames, setRecentGames] = useState<RecentGamesData | undefined>();
  const [quizData, setQuizData] = useState<questionsData[] | undefined>();
  const [triviaData, setTriviaData] = useState<questionsData[] | undefined>();
  const [gameCreated, setGameCreated] = useState<boolean>(false);
  const [questionsLoader, setQuestionsLoader] = useState<boolean>(false);
  const [triviaFetch, setTriviaFetch] = useState<boolean>(false);
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
  const [start, setStart] = useState<boolean>(false);
  const [play, { stop, sound }] = useSound(needForSpeedMusic, { volume: 0.5 });
  const [category, setCategory] = useState<string>("");
  const [gameDetails, setGameDetails] = useState<returnedDataType | undefined>();
  const [showCreateGameModal, setShowCreateGameModal] = useState<boolean>(false);
  const { pathname } = useLocation();
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
      setQuestionsLoader(true);

      try {
          await axios.get(triviaUrl).then((res) => {
            setTriviaData(res.data)
            setQuestionsLoader(false);
       })
 
      } catch (error) {
        console.log(error)
        setQuestionsLoader(false);
      }
    }

    fetchQuestion();
  }, [triviaFetch])




  //fetch data from main database
  useEffect(() => {

    const fetchQuestion = async () => {
      setQuestionsLoader(true);

      try {
    await service.getAll().then((res) => {
          setQuizData(res);
          setQuestionsLoader(false);
        })
      } catch (error) {
        console.log(error)
        setQuestionsLoader(false);
      }
    }

    fetchQuestion();
  }, [triviaFetch])



  //return data based on request
  const dataType = triviaFetch ? triviaData : quizData;

 
//fade into oblivion on game start
useEffect(() => {
  if (!showSplashScreen && pathname === '/quiz-home') {
    play();
  }
  else if ( pathname === '/quiz' && start) {
    sound.fade(0.5, 0, 9000);
  }
  else if ( pathname === '/') {
    sound?.fade(0.5, 0, 4000);
  }
  else return;
}, [showSplashScreen, start, pathname]);



//function create game form 1
  const handleScreenTwo = () => {
    setScreen(2)
  }




  const userId = useMemo(() => {
    return user?.id.toString();
  }, [user]);



//fetch recent games played
useEffect(() => {
  const fetchRecentGames = async () => {

   
   try {
    await service.recentResults(userId!).then((res) => {
        setRecentGames(res);
    })
   } catch (error) {
      console.log(error);
   }
  }

 fetchRecentGames();
}, [userId, pathname])







  

  //function create game form 2
  const handleInstructionScreen = async () => {

    const payload = {
      difficulty,
      total_questions: totalAllowedQuestions,
      total_players: Number(totalAllowedPlayers), 
      game_mode: gameMode,
      game_duration: gameDuration,
      category: Number(category),
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



  // function to start a game:
  const startGame = (date: any) => {
    setTimeOfStart(date);
    return;
  };



  // when an option is selected compare with correct answer in database and affect score:
  const addAnswer = (payload: { questionId: string; option: string }) => {
  
    const answer = dataType?.find(item => (item.id) === payload.questionId)
   

      if (answer?.correctAnswer === payload.option) {
        return setScore(score + 1)
      }
     
  };


  return (
    <QuizContext.Provider
      value={{ dataType, quizData, triviaData, setTriviaData, questionsLoader, setQuestionsLoader, setQuizData, start, setStart, score, setScore, addAnswer, timeOfStart, triviaFetch, setTriviaFetch, startGame, selectedOption, setSelectedOption, screen, setScreen, category, setCategory, difficulty, setDifficulty, totalAllowedQuestions, setTotalAllowedQuestions, totalAllowedPlayers, setTotalAllowedPlayers, gameMode, setGameMode, gameDuration, setGameDuration, showSplashScreen, setShowSplashScreen, handleScreenTwo, handleInstructionScreen, submitTimeRef, gameDetails, setGameDetails, user, gameCreated, setGameCreated, showCreateGameModal, setShowCreateGameModal, recentGames, setRecentGames}}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
