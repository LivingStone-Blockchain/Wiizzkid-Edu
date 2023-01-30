import React, {FC, useState, useContext} from 'react';
import { QuizContext, QuizContextType } from '../../../../context/quiz.context';
import { WiizzkidContext, WiizzkidContextType } from '../../../../context/wiizzkid.context';
import {TimestableContext,TimestableContextType } from '../../../../context/timestable.context';
import { ChartLegend, ChartCard } from '../Cards';
import { lineLegends } from './chartData';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { apiChartData as quizApiChartData } from '../../data/quizChartData';
import { apiChartData as timestableApiChartData} from '../../data/timeTableChartData';
import { monthLengthIdentifier } from './monthIdentifier';


//element registration
Chart.register(...registerables);



const LineChart = () => {
  const { quizRecentGames } = useContext(QuizContext) as QuizContextType;
  const { timestableRecentGames } = useContext(TimestableContext) as TimestableContextType;
  const { dashBoardMode } = useContext(WiizzkidContext) as WiizzkidContextType;

  const currentYear = new Date().getFullYear();

  //returns data for a year
  const dataPerYear =  dashBoardMode 
  ?  timestableApiChartData(timestableRecentGames!)?.filter((item) => new Date(item.created_at).getFullYear() === currentYear) 
  :  quizApiChartData(quizRecentGames!)?.filter((item) => new Date(item.created_at).getFullYear() === currentYear); 
    

    const months = dataPerYear.map((item) => new Date(item.created_at).toString().split(' ')[1]); // returns month of each game played for a year
    const uniqueMonths = new Set(months); //returns unique months
    const counts = [];

    //return months and numbers of appearance in list
    for ( const unique of uniqueMonths) {
        const filteredMonth = months.filter((month) => month === unique);
        counts.push({month: unique, count: filteredMonth.length})
    }
    const filteredData = (monthLengthIdentifier(counts.length, counts));

    const monthLabels = filteredData.map(item => item.month);
    const gamesPerMonth = filteredData.map(item => item.count);


   





    const [data, setData] = useState({
        labels: monthLabels,
        datasets: [{
          label: 'Total Games by Month',
          data: gamesPerMonth,
          backgroundColor: [
            '#252641'
          ],
          borderColor: [
            '#0694a2'
          ],
        }],
        options: {
          responsive: true,
        }
      });


      
  
  
    return (
    <>
        <ChartCard title='Total Games'>
            <Line data={data}/>
            <ChartLegend legends={lineLegends} />
        </ChartCard>
    </>
  )
}

export default LineChart