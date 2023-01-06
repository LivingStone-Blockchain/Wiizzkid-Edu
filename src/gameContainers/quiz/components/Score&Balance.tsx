import React, { useContext } from 'react'
import { QuizContext, QuizContextType } from '../../../context/quiz.context';
import { apiChartData } from '../../../components/dashboard/data/chartData';
import { TokenContext, TokenContextType } from '../../../context/token.context';
import { utils } from 'ethers';


type BoardDataType = {
  title: string,
  value: number | string | React.ReactNode,
}

const ScoreBalance = () => {
    const { recentGames } = useContext(QuizContext) as QuizContextType;
    const { stBalance } = useContext(TokenContext) as TokenContextType;

    
  //returns data for a year
  const dataPerYear =   apiChartData(recentGames!)?.filter((item) => new Date(item.created_at).getFullYear() === new Date().getFullYear()); 
  //latestScore
  const scoreData =   dataPerYear?.map((item) => item.score);
  const latestScore = scoreData?.length > 0 ? scoreData[scoreData?.length - 1] : 0;


    const boardData: BoardDataType[] = [
        {
          title: "Balance",
          value: utils.formatEther(stBalance),
        },
        {
          title: "Score",
          value: latestScore,
        }
      ] 

  return (
    <div className='absolute md:bottom-5 bottom-[14px] lg:right-16 right-4 mx-auto text-white flex gap-4 items-center justify-center md:text-base text-sm'> 
           <div className={`bg-gray-100 border-4 text-center flex w-[120px] md:w-[160px] p-1 md:p-2 items-center justify-center shadow-lg rounded-md border-tealLight`}>
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