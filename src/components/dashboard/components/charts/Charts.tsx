import React, {FC, useContext} from 'react';
import { QuizContext, QuizContextType } from '../../../../context/quiz.context';
import {TimestableContext,TimestableContextType } from '../../../../context/timestable.context';
import LineChart from './LineChart';
import DoughnutChart from './Doughnut';
import { Preloader } from './../../../index';



const Charts = () => {
  const { quizRecentGames } = useContext(QuizContext) as QuizContextType;
  const { timestableRecentGames } = useContext(TimestableContext) as TimestableContextType;
  


  return (
    <div className='w-full flex flex-col gap-5 mt-10'>
      <h1 className='font-semibold text-navy'>Charts</h1>
      {/*condition works for both requests*/}
      {quizRecentGames  === undefined ? (
        <Preloader dashboardLoader={true}/>
      ):(
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <DoughnutChart  />
        <LineChart />
      </div>
      )}
    </div>
  )
}

export default Charts