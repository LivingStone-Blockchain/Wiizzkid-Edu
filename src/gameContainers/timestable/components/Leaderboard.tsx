import { useEffect, useState, useContext, FC } from 'react';
import { trophy2 } from "../assets/images/index";
import Button from "./button/Button";
import service from '../services/services';
import { TimestableContext, TimestableContextType } from "../../../context/timestable.context";
import { Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


type ScoreBoardType = {
  player_id: number,
  game_id: string,
  score: number,
  total_attempted: number,
  full_name: string
}[]


type LeaderBoardData = {
  setStart: (value: React.SetStateAction<boolean>) => void,
  setGameCompleted: (value: React.SetStateAction<boolean>) => void,
  setShowLeaderBoard: (value: React.SetStateAction<boolean>) => void,
}


const LeaderBoard = ({ setStart, setGameCompleted, setShowLeaderBoard }: LeaderBoardData) => {
  const { gameDetails, showLeaderBoard } = useContext(TimestableContext) as TimestableContextType;
  const [scoreBoard, setScoreBoard] = useState<ScoreBoardType | undefined>([]);
  const navigate = useNavigate();



  useEffect(() => {
    if (gameDetails?.total_players !== scoreBoard?.length) {

    const intervalId = setInterval(async () => {
      try {
        await service.leaderBoard(gameDetails?.id!).then(res => setScoreBoard(res));
      } catch (error) {

      }
    }, 2000);

    return () => clearInterval(intervalId);
  }
    }, [showLeaderBoard]);

  return (
      <section className="max-w-sm mx-auto pb-4 rounded-md w-full">
        <article className="flex flex-col gap-3 text-center items-center justify-center p-3 bg-navy rounded">
          <div className="flex gap-3 items-center justify-center mt-2 text-white md:text-base text-sm leading-relaxed">
            <img src={trophy2} className="w-10 mx-auto" alt="trophy" />
            <p className="text-2xl font-bold text-teal">Leader Board!</p>
          </div>
          <div className='flex items-center justify-between m-2 w-full'>
            <p className="text-white space-x-5 md:text-sm text-xs leading-relaxed">
              Total players: {gameDetails?.total_players}
            </p>
            <p className="text-white space-x-5 md:text-sm text-xs leading-relaxed">
              Duration: {gameDetails?.game_duration}
            </p>
          </div>
        </article>

          <div className="overflow-x-auto relative text-center rounded">
          <table className="w-full text-sm text-left mt-2">
            <thead className="text-xs text-white bg-navy border-gray-700 rounded">
              <tr>
                <th scope="col" className="py-3 px-1 font-medium">
                  Rank
                </th>
                <th scope="col" className="py-3 px-1 font-medium">
                  Name
                </th>
                <th scope="col" className="py-3 px-1 font-medium">
                  Score
                </th>
                <th scope="col" className="py-3 px-1 font-medium">
                  Attempts
                </th>
              </tr>
            </thead>
            <tbody>
              {scoreBoard?.map(({ full_name, total_attempted, score }, index) => (
                <tr className="bg-white border-b border-gray-200" key={full_name}>
                  <td className="py-2 px-1">
                    <span className={`${index === 0 ? 'text-[#fe9d1b]' : 'text-gray-400'}`}><Crown /></span>
                  </td>
                  <td className="py-2 px-1">
                    <span className="font-medium text-navy text-xs">{full_name.split(' ')[0]}</span>
                  </td>
                  <td className="py-2 px-1">
                    <span className="font-medium text-navy text-xs">{score}</span>
                  </td>
                  <td className="py-2 px-1">
                    <span className="font-medium text-navy text-xs">{total_attempted}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {scoreBoard?.length === 0 && ( <div className='font-medium text-navy text-xs my-1 text-center animate-pulse'>Loading...</div> )}
          {scoreBoard?.length !== 0 && gameDetails?.total_players !== scoreBoard?.length && (<div className='font-medium text-navy text-xs my-1 text-center animate-pulse'>Waiting for other players...</div>)}
        </div>
        

        <Button
          className="flex justify-center mx-auto items-center gap-2 md:w-48 w-36 md:text-base text-sm bg-navy font-semibold px-5 py-3  text-white transition text-center mt-8"
          onClick={() => { toast.dismiss(); ; setStart(false); setGameCompleted(false); setShowLeaderBoard(false); navigate('/timestable-home') }}
        >
          Back home
        </Button>
      </section>
    )
}

export default LeaderBoard;
