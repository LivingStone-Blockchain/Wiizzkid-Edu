import React, { useContext } from 'react'
import { QuizContext, QuizContextType } from '../../../context/quiz.context';
import { apiChartData } from '../../../components/dashboard/data/chartData';
import imagePicker from './functions/imagePicker';




const History = () => {
    const { recentGames } = useContext(QuizContext) as QuizContextType;

     //returns data for a year
    const dataPerYear =   apiChartData(recentGames!)?.filter((item) => new Date(item.created_at).getFullYear() === new Date().getFullYear()); 

  return (
    <>
        {dataPerYear && (
            <div className="container md:pb-20 pb-16 px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700 md:mt-10 mt-8">
            <div className="md:mb-16 mb-12 md:w-2/3 lg:w-1/2">
                <h1 className="md:text-2xl text-xl font-semibold text-navy">Your Quiz <span className="text-tomato">History</span></h1>
                <p className="text-gray-500 space-x-5 my-3 md:text-base text-sm leading-relaxed font-medium">See how you are doing with Wiizzkid</p>
            </div>
    
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                { dataPerYear.slice(-3).map((item) => (
                     <section className="grid grid-cols-12 gap-4 p-6 shadow-lg bg-navy text-white rounded" key={item.gameId}>
                     <span className="col-span-3">
                       <img
                         src={imagePicker(item.category)}
                         alt="student"
                         className="w-full h-auto max-w-[100px] object-cover"
                       />
                     </span>
       
                     <article className="col-span-9">
                       <h1 className="font-medium md:text-base text-sm text-gray-300 capitalize">{item.category}</h1>
       
                       <p className='mt-1 md:text-sm text-xs  text-white'>
                         <span>score: </span> 
                         {item.score}/{item.total_questions}
                       </p>
                     </article>
                   </section>
                )) }  
              </div>
             
        </div>
        )}
    </>
  )
}

export default History;