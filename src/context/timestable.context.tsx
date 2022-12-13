import { createContext, FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import service from '../gameContainers/timestable/services/services';


type numData = {
    num: number,
}


//expected object key types from backend
type returnedDataType = {
    id: string,
    invite_code: string,
    difficulty: string,
    total_players: number,
    game_mode: string,
    game_duration: number,
  }


export interface TimestableContextType {
    digit: numData,
    setDigit: React.Dispatch<React.SetStateAction<numData>>,
    score: number,
    setScore: React.Dispatch<React.SetStateAction<number>>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    gameCreated: boolean,
    setGameCreated: React.Dispatch<React.SetStateAction<boolean>>,
    gameMode: string,
    setGameMode: React.Dispatch<React.SetStateAction<string>>,
    difficulty: string,
    setDifficulty: React.Dispatch<React.SetStateAction<string>>,
    showCreateGameModal: boolean,
    setShowCreateGameModal: React.Dispatch<React.SetStateAction<boolean>>,
    gameDetails: returnedDataType | undefined,
  setGameDetails: React.Dispatch<React.SetStateAction<returnedDataType | undefined>>,
    gameDuration: number,
    setGameDuration: React.Dispatch<React.SetStateAction<number>>,
    start: boolean,
    setStart: React.Dispatch<React.SetStateAction<boolean>>,
    totalAllowedPlayers: number,
    setTotalAllowedPlayers: React.Dispatch<React.SetStateAction<number>>,
    handleDigit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    handleDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    scoreTracker: (correctAnswer: number) => void,
    handlePlayTimestable: () => void,
    handleSubmission: () => void,
}


enum GameModes {
    london = "london",
    beijing = "beijing",
    shanghai = "shanghai"
  }


export const TimestableContext = createContext<TimestableContextType | null>(null);


const TimestableProvider: FC<any> = ({ children }) => {
    const [digit, setDigit] = useState<numData>({ num: 0 });
    const [score, setScore] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [gameCreated, setGameCreated] = useState<boolean>(false);
    const [difficulty, setDifficulty] = useState<string>("easy");
    const [gameDuration, setGameDuration] = useState<number>(2);
    const [totalAllowedPlayers, setTotalAllowedPlayers] = useState<number>(1);
    const [gameMode, setGameMode] = useState<string>(GameModes.london);
    const [showCreateGameModal, setShowCreateGameModal] = useState<boolean>(false);
    const [start, setStart] = useState<boolean>(false);
    const [gameDetails, setGameDetails] = useState<returnedDataType | undefined>();
    const navigate = useNavigate();

    const handleDigit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        setDigit({
            ...digit,
            num: parseInt(digit.num + e.currentTarget.innerText)
        });

    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setDigit({
            ...digit,
            num: digit.num.toString().length === 1
                ? 0
                : parseInt(digit.num.toString().slice(0, digit.num.toString().length - 1))
        });
    }

    //track result
    const scoreTracker = (correctAnswer: number) => {
        Number(correctAnswer) === digit.num && setScore(score + 1);
    }


    //initiate game
    const handlePlayTimestable = () => {
        toast.dismiss('showModal')
        setGameCreated(false);
        setStart(true);
        toast.loading("Preparing to start quiz...", { duration: 4000, id: "prepping" });
        setLoading(true);
        setTimeout(() => {
            toast.dismiss();
            setLoading(false);
        }, 4000)

        navigate('/timestable', { replace: true });
    };



    const handleSubmission = async () => {
        const payload = {
            difficulty,
            game_mode: gameMode,
            game_duration: gameDuration,
            total_players: Number(totalAllowedPlayers), 
            creator: 1,
        }

         
    try {
        await service.createGame(payload).then((res) => {
          setGameDetails(res);
        });
      } catch (error) {
        console.log(error);
      }

    }






    return (
        <TimestableContext.Provider
            value={{ digit, setDigit, handleDigit, handleDelete, score, setScore, scoreTracker, handlePlayTimestable, loading, setLoading, gameCreated, setGameCreated, gameDuration,  difficulty, setDifficulty, gameMode, setGameMode, setGameDuration, showCreateGameModal, setShowCreateGameModal, start, setStart, handleSubmission, totalAllowedPlayers, setTotalAllowedPlayers, gameDetails, setGameDetails }}
        >
            {children}
        </TimestableContext.Provider>
    );
};

export default TimestableProvider;
