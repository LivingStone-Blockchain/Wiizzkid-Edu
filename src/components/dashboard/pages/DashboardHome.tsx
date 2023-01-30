import React, { useContext } from 'react'
import { WiizzkidContext, WiizzkidContextType } from '../../../context/wiizzkid.context';
import { QuizContext, QuizContextType } from '../../../context/quiz.context';
import { CTA, TimestableDb, QuizDb } from '../../../components/dashboard/components/index';
import Button from '../../../components/Button';



const DashboardHome = () => {
  const { dashBoardMode, setDashBoardMode } = useContext(WiizzkidContext) as WiizzkidContextType;
  const { user } = useContext(QuizContext) as QuizContextType;



  return (
    <div  className="flex flex-col items-start justify-start">
      <CTA
        message='Welcome back to your Wiizzkid space'
        name={user!.full_name.split(' ')[0]}
      />
      <div  data-aos="fade-up" data-aos-delay="200" className="flex flex-row gap-2 items-center justify-end my-3 w-full mx-auto">
            <Button 
                children={dashBoardMode ? "See Quiz Data" : "See Timestable Data"}
                type='button'
                onClick={() => {
                  setDashBoardMode(!dashBoardMode);
                }}
                className='rounded-xl flex-initial md:w-48 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3  bg-[#252641]'
            />              
          </div>
      {dashBoardMode ? (
         <TimestableDb />
      ):(
        <QuizDb />
      )}
    </div>
  )
}

export default DashboardHome;