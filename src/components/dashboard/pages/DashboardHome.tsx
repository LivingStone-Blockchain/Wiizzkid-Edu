import React, { useContext, useEffect } from 'react'
import { QuizContext, QuizContextType } from '../../../context/quiz.context';
import { TokenContext, TokenContextType } from '../../../context/token.context';
import { MdOutlineContentCopy } from 'react-icons/md';
import { CTA, InfoCard, Charts } from '../components/index';
import { referral, score, balance, average } from '../../../assets/dashboard';
import { toast } from 'react-hot-toast';
import { apiChartData } from '../data/chartData';
import { utils } from "ethers";
import { Preloader } from './../../index';



const DashboardHome = () => {
  const { user, recentGames } = useContext(QuizContext) as QuizContextType;
  const { stBalance } = useContext(TokenContext) as TokenContextType;

  //returns data for a year
  const currentYear = new Date().getFullYear();
  const dataPerYear =  apiChartData(recentGames!)?.filter((item) => new Date(item.created_at).getFullYear() === currentYear); 
   //latestScore
   const scoreData =   dataPerYear?.map((item) => item.score);
   const latestScore = scoreData?.length > 0 ? scoreData[scoreData.length - 1] : 0;
 
 
   //rating calculation
   const scorePercent =  dataPerYear?.map((item) => (Number(item.score) / Number(item.total_questions)) * 100); 
   const totalScorePercent = scorePercent?.reduce((acc, curr) => Number(acc) + Number(curr), 0);
   const rating = scoreData?.length > 0 ?  ((Number(totalScorePercent)) / (scoreData.length)).toFixed(1) : 0;
  
  



  const handleCopyClick = async () => {
    //exec command for older browsers
    ("clipboard" in navigator)
      ? await navigator.clipboard.writeText(user!.player_code)
      : document.execCommand("copy", true, user!.player_code);

    toast.success("Referral code copied!");
  }


  return (
    <div
      className="flex flex-col items-start justify-start"
    >
      <CTA
        message='Welcome back to your Wiizzkid space'
        name={user!.full_name.split(' ')[0]}
      />
      {dataPerYear ? (
              <>
                <div data-aos="fade-up" data-aos-delay="300" className="grid gap-6 w-full mb-8 md:grid-cols-2 xl:grid-cols-4">
              <InfoCard
                title="Referral Code"
                value={user!.player_code}
                img={referral}
                children={<p className='p-2 rounded-full absolute top-2 right-2 bg-[#b9b9c5] cursor-pointer' onClick={handleCopyClick}><MdOutlineContentCopy className='w-3 h-3' /></p>}
              />
              <InfoCard
                title="STN Balance"
                value={Number(utils.formatEther(stBalance)).toFixed(2)}
                img={balance}
              />
              <InfoCard
                title="Latest Score"
                value={latestScore}
                img={score}
              />
              <InfoCard
                title="Average Rating"
                value={`${rating} %`}
                img={average}
              />
      
            </div>
            <Charts />
            </>
      ) : (<div className='mx-auto'><Preloader dashboardLoader={true}/></div>)}
    </div>
  )
}

export default DashboardHome;