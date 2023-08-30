import {
  createContext,
  FC,
  useState,
  useRef,
  useEffect,
  useContext,
  useMemo,
} from "react"
import service from "../gameContainers/quiz/services/services"
import axios from "axios"
import { needForSpeedMusic } from "../gameContainers/quiz/assets/audios"
import useSound from "use-sound"
import categoryStrings from "../gameContainers/quiz/components/functions/categoryStringConveter"
import { useLocation, useNavigate } from "react-router-dom"
import { UserContext, UserContextType } from "./user.context"
import { TokenContext, TokenContextType } from "./token.context"
import { toast } from "react-hot-toast"
import LeaderBoard from '../gameContainers/quiz/components/LeaderBoard';
import CreateQuizGameModal from "../gameContainers/quiz/components/CreateQuizGameModal";


type questionsData = {
  category: number
  correctAnswer: string
  difficulty: string
  id: number | string
  incorrectAnswers: string[]
  question: {
    text: string
  }
  region?: string
  tags: string[]
}

//expected object key types from backend
//some keys made optional for unlogged users payload
type returnedDataType = {
  id?: string
  invite_code?: string
  creator?: number
  difficulty: string
  total_questions: number
  total_players: number
  game_mode: string
  game_duration: number
  category: number
  current_players?: number
  stone_token_fee?: number
  players?: number[],
  submitted?: number
  
}

type RecentGamesData = {
  games: {
    total_questions: number
    total_players: number
    game_mode: string
    game_duration: number
    category: number
    created_at: string
    difficulty: string
    id: number
    creator: number
    invite_code: string
  }[]
  scores: {
    player_id: number
    game_id: string
    score: number
    submit_time: number
  }[]
}

//user details object
type userType = {
  email: string
  tokens: {
    access: string
    refresh: string
  }
  full_name: string
  stone_token: number
  id: number
  player_code: string
  stone_token_winnings?: number
   wallet_address?: string
}


type ScoreBoardType = {
  player_id: number,
  game_id: string,
  score: number,
  submit_time: number,
  full_name: string,
  winnings: number,
  wallet_address: string
}[]



export interface QuizContextType {
  submitTimeRef: any
  timeOfStart: any
  triviaUrl: string
  startGame: (date: any) => void
  quizData: questionsData[] | undefined
  setQuizData: React.Dispatch<React.SetStateAction<questionsData[] | undefined>>
  triviaData: questionsData[] | undefined
  setTriviaData: React.Dispatch<React.SetStateAction<questionsData[] | undefined>>
  quizRecentGames: RecentGamesData | undefined
  setQuizRecentGames: React.Dispatch<React.SetStateAction<RecentGamesData | undefined>>
  selectedOption: number | string
  setSelectedOption: React.Dispatch<React.SetStateAction<number | string>>
  addAnswer: (payload: { questionId: string; option: string }) => void
  score: number
  setScore: React.Dispatch<React.SetStateAction<number>>
  screen: number
  setScreen: React.Dispatch<React.SetStateAction<number>>
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
  difficulty: string
  setDifficulty: React.Dispatch<React.SetStateAction<string>>
  totalAllowedQuestions: string
  setTotalAllowedQuestions: React.Dispatch<React.SetStateAction<string>>
  totalAllowedPlayers: number
  setTotalAllowedPlayers: React.Dispatch<React.SetStateAction<number>>
  gameMode: string
  setGameMode: React.Dispatch<React.SetStateAction<string>>
  gameDuration: string
  setGameDuration: React.Dispatch<React.SetStateAction<string>>
  gameDetails: returnedDataType | undefined
  setGameDetails: React.Dispatch<React.SetStateAction<returnedDataType | undefined>>
  triviaFetch: boolean
  setTriviaFetch: React.Dispatch<React.SetStateAction<boolean>>
  gameCreated: boolean
  setGameCreated: React.Dispatch<React.SetStateAction<boolean>>
  tokenFee: string
  setTokenFee: React.Dispatch<React.SetStateAction<string>>
  questionsLoader: boolean
  setQuestionsLoader: React.Dispatch<React.SetStateAction<boolean>>
  handleScreenTwo: () => void
  handleInstructionScreen: () => void
  handleDisplayCreateGameModal: () => void
  handleTryLondonMode: () => void
  showSplashScreen: boolean
  setShowSplashScreen: React.Dispatch<React.SetStateAction<boolean>>
  showCreateGameModal: boolean
  setShowCreateGameModal: React.Dispatch<React.SetStateAction<boolean>>
  tryLondon: boolean
  setTryLondon: React.Dispatch<React.SetStateAction<boolean>>
  submitTime: number
  setSubmitTime: React.Dispatch<React.SetStateAction<number>>
  showLeaderBoard: boolean
  setShowLeaderBoard: React.Dispatch<React.SetStateAction<boolean>>
  scoreBoard: ScoreBoardType | undefined
  setScoreBoard: React.Dispatch<React.SetStateAction<ScoreBoardType | undefined>>
  submitted: boolean
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  allSubmitted: boolean
  setAllSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  start: boolean
  setStart: React.Dispatch<React.SetStateAction<boolean>>
  allowGameProcession: boolean
  setAllowGameProcession: React.Dispatch<React.SetStateAction<boolean>>
  allowGameSubmission: boolean
  setAllowGameSubmission: React.Dispatch<React.SetStateAction<boolean>>
  user: userType | null
}

enum GameModes {
  london = "london",
  beijing = "beijing",
  shanghai = "shanghai",
}

export const QuizContext = createContext<QuizContextType | null>(null)

const QuizProvider: FC<any> = ({ children }) => {
  const submitTimeRef = useRef<HTMLSpanElement>(null)
  const [selectedOption, setSelectedOption] = useState<string | number>("")
  const [timeOfStart, setTimeOfStart] = useState<any>()
  const [screen, setScreen] = useState(1)
  const [difficulty, setDifficulty] = useState<string>("easy")
  const [totalAllowedQuestions, setTotalAllowedQuestions] = useState<string>("")
  const [totalAllowedPlayers, setTotalAllowedPlayers] = useState<number>(1)
  const [tokenFee, setTokenFee] = useState<string>("")
  const [gameMode, setGameMode] = useState<string>(GameModes.london)
  const [gameDuration, setGameDuration] = useState<string>("")
  const [score, setScore] = useState<number>(0)
  const [quizRecentGames, setQuizRecentGames] = useState<RecentGamesData | undefined>()
  const [quizData, setQuizData] = useState<questionsData[] | undefined>()
  const [triviaData, setTriviaData] = useState<questionsData[] | undefined>()
  const [gameCreated, setGameCreated] = useState<boolean>(false)
  const [questionsLoader, setQuestionsLoader] = useState<boolean>(false)
  const [triviaFetch, setTriviaFetch] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false) ///single player
  const [allSubmitted, setAllSubmitted] = useState<boolean>(false) //multiplayer
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true)
  const [tryLondon, setTryLondon] = useState<boolean>(false)
  const [submitTime, setSubmitTime] = useState<number>(0)
  const [start, setStart] = useState<boolean>(false)
  const [play, { stop, sound }] = useSound(needForSpeedMusic, { volume: 0.2 })
  const [category, setCategory] = useState<string>("")
  const [gameDetails, setGameDetails] = useState<returnedDataType | any>()
  const [showCreateGameModal, setShowCreateGameModal] = useState<boolean>(false)
  const [scoreBoard, setScoreBoard] = useState<ScoreBoardType | undefined>([]);
  const [showLeaderBoard, setShowLeaderBoard] = useState<boolean>(false)
  const [allowGameProcession, setAllowGameProcession] = useState<boolean>(false)
  const [allowGameSubmission, setAllowGameSubmission] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  //get user details from userContext
  const { user, setRefreshTokenError, refreshedUser } = useContext(UserContext) as UserContextType;
  //get createGame to deduct token on game creation
  const { deductTokenOnGameCreate, address, stBalance, secondApproval } = useContext(TokenContext) as TokenContextType;


  

//reset initial category value based game mode changes. this is needed for when users didn't choose category and are fine with the first on the list
useEffect(() => {
  let categoryInitialVal = gameMode === "london" ? "8" : "13"
  setCategory(categoryInitialVal)
}, [gameMode])




  //fetch data from external endpoint (trivia-quiz) for non-users
  let triviaUrl = `https://the-trivia-api.com/api/questions?categories=${categoryStrings(Number(category))}&limit=${totalAllowedQuestions}&difficulty=${difficulty}`



  //return data based on request
  //const dataType = triviaFetch ? triviaData : quizData

  //fade into oblivion on game start
  useEffect(() => {
    if (!showSplashScreen && pathname === "/quiz-home") {
      play()
    } else if (pathname === "/quiz" && start) {
      sound.fade(0.2, 0, 9000)
    } else if (pathname === "/") {
      stop()
    } else return
  }, [showSplashScreen, start, pathname])


  

  //show leader board with results
  useEffect(() => {
    if (showLeaderBoard) {
      toast.dismiss();
  
      toast(
        <LeaderBoard />,
        { duration: Infinity, className: "w-full" }
      );
    } else {
      setScoreBoard([]);
    }
  
  }, [showLeaderBoard])





  
//Load create quiz modal automatically
useEffect(() => {
  if (tryLondon) {
    setShowCreateGameModal(true);
    setScreen(1);
  
    toast(
      <CreateQuizGameModal setShowCreateGameModal={setShowCreateGameModal} />,
      { duration: Infinity, className: "w-full" }
    );
  }
}, [tryLondon])




  //function create game form 1
  const handleScreenTwo = () => {
    //alert user if token is insufficient based on difficulty
    if (gameMode === "shanghai" && difficulty === "easy" && Number(tokenFee) <= 9) {
        toast.dismiss("low")
        toast.error(
          <span className="text-sm">Insufficient token!</span>,
          { duration: 3000, id: "low" }
        )
        setTimeout(() => {
          toast.dismiss("low")
          setScreen(1)
        }, 3000)
    }
    if (gameMode === "shanghai" && difficulty === "medium" && Number(tokenFee) <= 99) {
        toast.dismiss("low")
        toast.error(
          <span className="text-sm">Insufficient token!</span>,
          { duration: 3000, id: "low" }
        )
        setTimeout(() => {
          toast.dismiss("low")
          setScreen(1)
        }, 3000)
    }
    if (gameMode === "shanghai" && difficulty === "hard" && Number(tokenFee) <= 499) {
        toast.dismiss("low")
        toast.error(
          <span className="text-sm">Insufficient token!</span>,
          { duration: 3000, id: "low" }
        )
        setTimeout(() => {
          toast.dismiss("low")
          setScreen(1)
        }, 3000)
    }
    setScreen(2)
  }




  const userId = useMemo(() => {
    return user?.id.toString()
  }, [user])

  //fetch recent games played
  useEffect(() => {
    const fetchRecentGames = async () => {
      if (userId !== undefined) {
        try {
          await service.recentResults(userId).then((res) => {
            setQuizRecentGames(res)
          })
        } catch (error) {
          console.log(error)
        }
      }
    }

    fetchRecentGames()
  }, [userId, pathname])





//handle start Quiz button on game homepage and initialize pop-up
const handleDisplayCreateGameModal = () => {
  setShowCreateGameModal(true);
  setScreen(1);

  toast(
    <CreateQuizGameModal setShowCreateGameModal={setShowCreateGameModal} />,
    { duration: Infinity, className: "w-full" }
  );
};




//handle London mode from main Landing page
const handleTryLondonMode = () => {
  navigate('/quiz-home');
  setShowSplashScreen(false);

  setTimeout(() => { setTryLondon(true)}, 1000)
}





  //function create game form 2
  const handleInstructionScreen = async () => {
    const userPayload = user && {
      difficulty,
      total_questions: Number(totalAllowedQuestions),
      total_players: Number(totalAllowedPlayers),
      game_mode: gameMode,
      game_duration: Number(gameDuration),
      category: Number(category),
      creator: user.id,
      stone_token_fee: Number(tokenFee),
    }

    const nonUserPayload = {
      difficulty,
      total_questions: totalAllowedQuestions,
      total_players: Number(totalAllowedPlayers),
      game_mode: gameMode,
      game_duration: Number(gameDuration),
      category: Number(category),
    }

   

    //persist only logged user data to backend
    try {
      if (user?.tokens) {
         await service
          .createGame(userPayload!, refreshedUser?.access!)
          .then((res) => {
            setGameDetails(res.game);
            setQuizData(res.questions)
            //deduct game stone token fee from smart contract for creator if its not london
            gameMode !== 'london' && totalAllowedPlayers > 1 && deductTokenOnGameCreate(Number(tokenFee), res?.id!);
           
          })}
          else{
              await axios.get(triviaUrl).then((res) => {
                setGameDetails(nonUserPayload);
                setQuizData(res.data)
                setQuestionsLoader(false)
              })
          }


      setTimeout(() => {
        toast.dismiss("loading");
        setGameCreated(true);
        toast.success(<span id="success-notification" className="lg:text-base text-sm">Quiz game created successfully!</span>);
      }, 3000);

    } catch (error:any) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        setRefreshTokenError(true)
      }
    }

    setTokenFee("");
    setTryLondon(false);
  }



  



 //send approval success signal to backend once second metamask approval is completed
 useEffect(() => {
  //send player id and game id to backend after successful deduction. This required to add player to game session
  const payload = {
    player_id: user?.id!,
    game_id: gameDetails?.id!
  };

 
    const sendApproval = async() => {
      if(secondApproval && gameDetails?.total_players! > 1) {
        try { 
          await service.userApprovalOnTokenDeduction(payload, refreshedUser?.access!);
        } catch (error) {
          console.log(error);
        }
   }
  }

    sendApproval();
}, [secondApproval])









  // function to start a game:
  const startGame = (date: any) => {
    setScore(0) //set score to 0 before initializing
    
    setTimeOfStart(date)
    return
  }

  // when an option is selected compare with correct answer in database and affect score:
  const addAnswer = (payload: {
    questionId: string
    option: string
  }) => {
    const answer = quizData?.find(
      (item) => item.id === payload.questionId
    )

    if (answer?.correctAnswer === payload.option) {
      
      return setScore(score + 1)
    
    }
  }


 

  
  useEffect(() => {
    //if allowGameSubmission visit endpoint
    const handleEnforcePlayersSubmit = async () => {
      if (allowGameSubmission && !allSubmitted && submitted) {
        try {
          const payload = {
            option: "yes"
          };
          const res = await service.enforcePlayersSubmit(gameDetails?.id!, payload);
          //setAllSubmitted(res.message);
          //const gameRes = await service.currentGame(gameDetails.id, refreshedUser?.access!);
          //setGameDetails(gameRes);
          setAllSubmitted(true);
        } catch (error) {
          // Handle error if needed
        }
      }
    };
  
    handleEnforcePlayersSubmit();
   
  }, [submitted, allSubmitted, allowGameSubmission, gameDetails, refreshedUser, user]);





  useEffect(() => {
    const handleCheckPlayersSubmit = async () => {
      if (submitted && !allSubmitted) {
        const intervalId = setInterval(async () => {
          try {
            const res = await service.checkPlayersSubmit(gameDetails?.id!);
            const gameRes = await service.currentGame(gameDetails.id, refreshedUser?.access!);
            setGameDetails(gameRes);
            setAllSubmitted(true);
            //lets look at this res
            //setAllSubmitted(res.message);
          } catch (error) {
            // Handle error if needed
          }
        }, 2000);
  
        return () => clearInterval(intervalId);
      }
    };

    
    handleCheckPlayersSubmit()
  }, [submitted, allSubmitted]);


  

  console.log(gameDetails)
  

  //for other participants to see board
  useEffect(() => {
    if (gameDetails?.submitted === gameDetails?.total_players) {
      setAllSubmitted(true)
    }
  }, [submitted])





  return (
    <QuizContext.Provider
      value={{
        quizData,
        triviaData,
        setTriviaData,
        questionsLoader,
        setQuestionsLoader,
        setQuizData,
        submitted,
        setSubmitted,
        allSubmitted,
        setAllSubmitted,
        submitTime, 
        setSubmitTime,
        start,
        setStart,
        score,
        setScore,
        addAnswer,
        timeOfStart,
        triviaFetch,
        setTriviaFetch,
        startGame,
        selectedOption,
        setSelectedOption,
        screen,
        setScreen,
        category,
        setCategory,
        difficulty,
        setDifficulty,
        totalAllowedQuestions,
        setTotalAllowedQuestions,
        totalAllowedPlayers,
        setTotalAllowedPlayers,
        gameMode,
        setGameMode,
        gameDuration,
        setGameDuration,
        showSplashScreen,
        setShowSplashScreen,
        handleScreenTwo,
        handleInstructionScreen,
        handleDisplayCreateGameModal,
        handleTryLondonMode,
        tryLondon, 
        setTryLondon,
        submitTimeRef,
        gameDetails,
        setGameDetails,
        user,
        gameCreated,
        setGameCreated,
        showCreateGameModal,
        setShowCreateGameModal,
        showLeaderBoard,
        setShowLeaderBoard,
        scoreBoard,
        setScoreBoard,
        quizRecentGames,
        setQuizRecentGames,
        tokenFee,
        setTokenFee,
        allowGameProcession, 
        setAllowGameProcession,
        allowGameSubmission, 
        setAllowGameSubmission,
        triviaUrl
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export default QuizProvider
