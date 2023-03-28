import React, { useContext } from 'react'
import { QuizContext, QuizContextType } from '../../../context/quiz.context';
import { apiChartData } from '../../../components/dashboard/data/quizChartData';
import { TokenContext, TokenContextType } from '../../../context/token.context';
import { ExchangeContext, ExchangeContextType } from '../../../context/exchange.context';
import { utils } from 'ethers';


type BoardDataType = {
  title: string,
  value: number | string | React.ReactNode,
}

const ScoreBalance = () => {
    const { quizRecentGames, scoreBoard, user, score } = useContext(QuizContext) as QuizContextType;
    const { userDetail } = useContext(TokenContext) as TokenContextType;
    const { stBalance } = useContext(ExchangeContext) as ExchangeContextType;
    
  //returns data for a year
  const dataPerYear =   apiChartData(quizRecentGames!)?.filter((item) => new Date(item.created_at).getFullYear() === new Date().getFullYear()); 
  //latestScore
  const scoreData =   dataPerYear?.map((item) => item.score);
  const latestScore = scoreData?.length > 0 ? scoreData[scoreData?.length - 1] : 0;

console.log(userDetail?.stone_token_winnings);

    const userBoardData: BoardDataType[] = [
        {
          title: "Balance",
          value: Number(utils.formatEther(stBalance)).toFixed(1),
        },
        {
          title: "Winnings",
          value: userDetail?.stone_token_winnings! === undefined ? 0 :  userDetail?.stone_token_winnings?.toFixed(1),
        },
        {
          title: "Score",
          value: latestScore,
        }
      ] 


       const nonUserBoardData: BoardDataType[] = [
        {
          title: "Balance",
          value: Number(utils.formatEther(stBalance)).toFixed(1),
        },
        {
          title: "Score",
          value: score,
        }
      ] 

      //render board based on roles
      const boardData = user ? userBoardData : nonUserBoardData;

  return (
    <div className='absolute md:bottom-5 bottom-[14px] lg:right-16 right-4 mx-auto text-white flex gap-4 items-center justify-center md:text-base text-sm'> 
           <div className={`bg-gray-100 border-4 text-center flex ${user ? 'w-[170px] md:w-[240px]' : 'w-[120px] md:w-[160px]'} p-1 md:p-2 items-center justify-center shadow-lg rounded-md border-tealLight`}>
            {boardData.map((item) => (
              <div className="col-4" key={item.title}>
              <div className={`text-tealLight md:text-base text-sm bg-gray-200 md:p-2 p-[2px] font-semibold border-x border-gray-300`}>
                <p id="m-0 text-sm">{item.value}</p>
                <span className="md:text-sm text-xs leading-none font-medium text-darken">{item.title}</span>
              </div>
            </div>
            ))}
          </div>
          </div>
  )
}

export default ScoreBalance;