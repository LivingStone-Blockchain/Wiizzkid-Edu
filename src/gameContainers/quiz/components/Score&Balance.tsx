import React, { useContext } from 'react'
import { QuizContext, QuizContextType } from '../../../context/quiz.context';
import { apiChartData } from '../../../components/dashboard/data/quizChartData';
import { TokenContext, TokenContextType } from '../../../context/token.context';
import { utils } from 'ethers';


type BoardDataType = {
  title: string,
  value: number | string | React.ReactNode,
}

const ScoreBalance = () => {
    const { quizRecentGames } = useContext(QuizContext) as QuizContextType;
    const { balanceOfStoneTokens } = useContext(TokenContext) as TokenContextType;

    
  //returns data for a year
  const dataPerYear =   apiChartData(quizRecentGames!)?.filter((item) => new Date(item.created_at).getFullYear() === new Date().getFullYear()); 
  //latestScore
  const scoreData =   dataPerYear?.map((item) => item.score);
  const latestScore = scoreData?.length > 0 ? scoreData[scoreData?.length - 1] : 0;


    const boardData: BoardDataType[] = [
        {
          title: "Balance",
          value: Number(utils.formatEther(balanceOfStoneTokens)).toFixed(1),
        },
        {
          title: "Winnings",
          value: 5,
        },
        {
          title: "Score",
          value: latestScore,
        }
      ] 

  return (
    <div className='absolute md:bottom-5 bottom-[14px] lg:right-16 right-4 mx-auto text-white flex gap-4 items-center justify-center md:text-base text-sm'> 
           <div className={`bg-gray-100 border-4 text-center flex w-[170px] md:w-[240px] p-1 md:p-2 items-center justify-center shadow-lg rounded-md border-tealLight`}>
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