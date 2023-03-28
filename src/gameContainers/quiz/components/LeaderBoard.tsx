import { useEffect, useState, useContext, FC } from 'react';
import { trophy } from "../assets/images";
import Button from "./button/Button";
import service from '../services/services';
import { QuizContext, QuizContextType } from "../../../context/quiz.context";
import { FaCrown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';



type LeaderBoardData = {
  setStart: (value: React.SetStateAction<boolean>) => void,
  setTriviaFetch: (value: React.SetStateAction<boolean>) => void,
  setShowLeaderBoard: (value: React.SetStateAction<boolean>) => void,
  setSubmitted: (value: React.SetStateAction<boolean>) => void,
}


const LeaderBoard = ({ setStart, setTriviaFetch, setShowLeaderBoard }: LeaderBoardData) => {
  const { gameDetails, showLeaderBoard, scoreBoard, setScoreBoard, start, setTotalAllowedPlayers, allSubmitted} = useContext(QuizContext) as QuizContextType;
  const navigate = useNavigate();



    useEffect(() => {
      if (allSubmitted) {
        const fetchLeaderBoard = async () => {
          try {
            const res = await service.leaderBoard(gameDetails?.id!);
            setScoreBoard(res.winners);
          } catch (error) {
            console.log(error);
          }
        };
        fetchLeaderBoard();
      }
    }, [allSubmitted])



  return (
      <section className="max-w-sm mx-auto pb-4 rounded-md w-full">
        <article className="flex flex-col gap-3 text-center items-center justify-center p-3 bg-navy rounded">
          <div className="flex gap-3 items-center justify-center mt-2 text-white md:text-base text-sm leading-relaxed">
            <img src={trophy} className="w-10 mx-auto" alt="trophy" />
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
                  Time(s)
                </th>
                <th scope="col" className="py-3 px-1 font-medium">
                  Score
                </th>
                <th scope="col" className="py-3 px-1 font-medium">
                  Winning
                </th>
              </tr>
            </thead>
            <tbody>
              {scoreBoard?.map(({ full_name, submit_time, score, winnings }, index) => (
                <tr className="bg-white border-b border-gray-200" key={full_name}>
                  <td className="py-2 px-1">
                    <span className={`${index === 0 ? 'text-[#fe9d1b]' : 'text-gray-400'}`}><FaCrown /></span>
                  </td>
                  <td className="py-2 px-1">
                    <span className="font-medium text-navy text-xs">{full_name.split(' ')[0]}</span>
                  </td>
                  <td className="py-2 px-1">
                    <span className="font-medium text-navy text-xs">{(gameDetails?.game_duration! * 60) - submit_time}</span>
                  </td>
                  <td className="py-2 px-1">
                    <span className="font-medium text-navy text-xs">{score}</span>
                  </td>
                  <td className="py-2 px-1">
                    <span className="font-medium text-navy text-xs">{winnings.toFixed(1)} ST</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        

        <Button
          className={`flex justify-center mx-auto items-center gap-2 md:w-48 w-36 md:text-base text-sm bg-navy font-semibold px-5 py-3  text-white transition text-center mt-8`}
          onClick={() => { toast.dismiss(); setStart(false); setTriviaFetch(false); setShowLeaderBoard(false); navigate('/quiz-home'), setTotalAllowedPlayers(0); }}
        >
          Back home
        </Button>
      </section>
    )
}

export default LeaderBoard;
