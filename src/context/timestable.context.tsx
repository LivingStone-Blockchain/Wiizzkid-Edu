import {
  createContext,
  FC,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react"
import { useNavigate, useLocation } from "react-router-dom"
import toast from "react-hot-toast"
import service from "../gameContainers/timestable/services/services"
import { needForSpeedMusic } from "../gameContainers/quiz/assets/audios"
import useSound from "use-sound"
import { UserContext, UserContextType } from "./user.context"
import LeaderBoard from '../gameContainers/timestable/components/Leaderboard'
import { TokenContext, TokenContextType } from "./token.context"



type numData = {
  num: number
}

//expected object key types from backend
type returnedDataType = {
  id?: string
  invite_code?: string
  difficulty: string
  total_players: number
  game_mode: string
  game_duration: number
  creator: number
  current_players?: number
  stone_token_fee?: number
}




type RecentGamesData = {
  games: {
    total_players: number
    game_mode: string
    game_duration: number
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
    total_attempted: number
  }[]
}




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
}

export interface TimestableContextType {
  digit: numData
  setDigit: React.Dispatch<React.SetStateAction<numData>>
  score: number
  setScore: React.Dispatch<React.SetStateAction<number>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  gameCreated: boolean
  setGameCreated: React.Dispatch<React.SetStateAction<boolean>>
  gameMode: string
  setGameMode: React.Dispatch<React.SetStateAction<string>>
  difficulty: string
  setDifficulty: React.Dispatch<React.SetStateAction<string>>
  showSplashScreen: boolean
  setShowSplashScreen: React.Dispatch<React.SetStateAction<boolean>>
  showCreateGameModal: boolean
  setShowCreateGameModal: React.Dispatch<React.SetStateAction<boolean>>
  gameDetails: returnedDataType | undefined
  setGameDetails: React.Dispatch<React.SetStateAction<returnedDataType | undefined>>
  gameDuration: number
  setGameDuration: React.Dispatch<React.SetStateAction<number>>
  timestableRecentGames: RecentGamesData | undefined
  setTimestableRecentGames: React.Dispatch<React.SetStateAction<RecentGamesData | undefined>>
  start: boolean
  setStart: React.Dispatch<React.SetStateAction<boolean>>
  gameCompleted: boolean
  setGameCompleted: React.Dispatch<React.SetStateAction<boolean>>
  totalAllowedPlayers: number
  setTotalAllowedPlayers: React.Dispatch<React.SetStateAction<number>>
  showLeaderBoard: boolean
  setShowLeaderBoard: React.Dispatch<React.SetStateAction<boolean>>
  tokenFee: string
  setTokenFee: React.Dispatch<React.SetStateAction<string>>
  handleDigit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  handleDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  scoreTracker: (correctAnswer: number) => void
  allowGameProcession: boolean
  setAllowGameProcession: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmission: () => void
  user: userType | null
}

enum GameModes {
  london = "london",
  beijing = "beijing",
  shanghai = "shanghai",
}

export const TimestableContext =
  createContext<TimestableContextType | null>(null)

const TimestableProvider: FC<any> = ({ children }) => {
  const [digit, setDigit] = useState<numData>({ num: 0 })
  const [score, setScore] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [gameCreated, setGameCreated] = useState<boolean>(false)
  const [difficulty, setDifficulty] = useState<string>("easy")
  const [gameDuration, setGameDuration] = useState<number>(2)
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true)
  const [totalAllowedPlayers, setTotalAllowedPlayers] = useState<number>(1)
  const [tokenFee, setTokenFee] = useState<string>("")
  const [gameMode, setGameMode] = useState<string>(GameModes.london)
  const [showCreateGameModal, setShowCreateGameModal] = useState<boolean>(false)
  const [start, setStart] = useState<boolean>(false)
  const [gameCompleted, setGameCompleted] = useState<boolean>(false)
  const [play, { stop, sound }] = useSound(needForSpeedMusic, {volume: 0.3,})
  const [gameDetails, setGameDetails] = useState<returnedDataType | undefined>()
  const [timestableRecentGames, setTimestableRecentGames] = useState<RecentGamesData | undefined>()
  const [showLeaderBoard, setShowLeaderBoard] = useState<boolean>(false);
  const [allowGameProcession, setAllowGameProcession] = useState<boolean>(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  //get user details from userContext
  const { user, refreshedUser, setRefreshTokenError } = useContext(UserContext) as UserContextType
  //get createGame to deduct token on game creation
  const { deductTokenOnGameCreate, address, stBalance, secondApproval } = useContext(TokenContext) as TokenContextType;





  //fade into oblivion on game start
  useEffect(() => {
    if (!showSplashScreen && pathname === "/timestable-home") {
      play()
    } else if (pathname === "/timestable" && start) {
      sound.fade(0.3, 0, 9000)
    } else if (pathname === "/") {
      stop()
    } else return
  }, [showSplashScreen, start, pathname])

  const handleDigit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    setDigit({
      ...digit,
      num: parseInt(digit.num + e.currentTarget.innerText),
    })
  }

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setDigit({
      ...digit,
      num:
        digit.num.toString().length === 1
          ? 0
          : parseInt(
              digit.num
                .toString()
                .slice(0, digit.num.toString().length - 1)
            ),
    })
  }



  //track result
  const scoreTracker = (correctAnswer: number) => {
    Number(correctAnswer) === digit.num && setScore(score + 1)
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
            setTimestableRecentGames(res)
          })
        } catch (error) {
          console.log(error)
        }
      }
    }

    fetchRecentGames()
  }, [userId, pathname])





 
  //show leader board with results
  useEffect(() => {
    if (showLeaderBoard) {
      toast.dismiss();
  
      toast(
        <LeaderBoard />,
        { duration: Infinity, className: "w-full" }
      );
    }
  
  }, [showLeaderBoard])





  const handleSubmission = async () => {
    if (gameDuration < 2) {
      return toast.error("1 minute not allowed", { duration: 3000 })
    }

     //alert user if token is insufficient based on difficulty
     if (gameMode === "shanghai" && difficulty === "easy" && Number(tokenFee) <= 9) {
        toast.error(<span className="text-sm">Insufficient token!</span>,{ duration: 3000, id: "low" })
        setTimeout(() => {
          toast.dismiss("low")
        }, 3000)
        return
      }
    if (gameMode === "shanghai" && difficulty === "medium" && Number(tokenFee) <= 99) {
        toast.dismiss("low")
        toast.error(<span className="text-sm">Insufficient token!</span>,{ duration: 3000, id: "low" })
        setTimeout(() => {
          toast.dismiss("low")
        }, 3000)
        return
    }
    if (gameMode === "shanghai" && difficulty === "hard" && Number(tokenFee) <= 499) {
        toast.dismiss("low")
        toast.error(<span className="text-sm">Insufficient token!</span>,{ duration: 3000, id: "low" })
        setTimeout(() => {
          toast.dismiss("low")
        }, 3000)
        return
    }

    const payload = {
      difficulty,
      game_mode: gameMode,
      game_duration: gameDuration,
      total_players: Number(totalAllowedPlayers),
      creator: user!.id,
      stone_token_fee: Number(tokenFee),
    }

    try {
      user?.tokens
        ? await service
          .createGame(payload, refreshedUser?.access!)
          .then((res) => {
            setGameDetails(res);
            //deduct game stone token fee from smart contract for creator if its not london
            gameMode !== 'london' && totalAllowedPlayers > 1 && deductTokenOnGameCreate(Number(tokenFee), res?.id!);
          })
        : setGameDetails(payload)

        setTimeout(() => {
          toast.dismiss("loading");
          toast.success("Game created successfully!", {id: 'success'});
          setGameCreated(true);
        }, 4000);
      
    }  catch (error:any) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        setRefreshTokenError(true)
      }
    }

    setTokenFee("");
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


 
  return (
    <TimestableContext.Provider
      value={{
        digit,
        setDigit,
        handleDigit,
        handleDelete,
        score,
        setScore,
        scoreTracker,
        loading,
        setLoading,
        gameCreated,
        setGameCreated,
        gameDuration,
        difficulty,
        setDifficulty,
        gameMode,
        setGameMode,
        setGameDuration,
        showSplashScreen,
        setShowSplashScreen,
        showCreateGameModal,
        setShowCreateGameModal,
        gameCompleted, 
        setGameCompleted,
        start,
        setStart,
        handleSubmission,
        totalAllowedPlayers,
        setTotalAllowedPlayers,
        gameDetails,
        setGameDetails,
        tokenFee,
        setTokenFee,
        user,
        timestableRecentGames, 
        setTimestableRecentGames,
        showLeaderBoard, 
        setShowLeaderBoard,
        allowGameProcession, 
        setAllowGameProcession
      }}
    >
      {children}
    </TimestableContext.Provider>
  )
}

export default TimestableProvider
