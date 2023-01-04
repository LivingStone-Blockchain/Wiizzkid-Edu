import React, {FC, useContext} from 'react';
import { QuizContext, QuizContextType } from '../../../../context/quiz.context';
import LineChart from './LineChart';
import DoughnutChart from './Doughnut';
import { Preloader } from './../../../index';



const Charts = () => {
  const { recentGames } = useContext(QuizContext) as QuizContextType;
  
  return (
    <div data-aos="fade-up" data-aos-delay="400" className='w-full flex flex-col gap-5 mt-10'>
      <h1 className='font-semibold text-navy'>Charts</h1>
      {recentGames === undefined ? (
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