import React, { useContext} from 'react'
import { UserContext, UserContextType } from '../../context/user.context';
import { MdOutlineContentCopy } from 'react-icons/md';
import { CTA, InfoCard } from './index';
import { referral,score, balance, average } from './../../assets/dashboard';
import { toast } from 'react-hot-toast';



const DashboardHome = () => {
    const { user } = useContext(UserContext) as UserContextType;


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
          <div className="grid gap-6 w-full mb-8 md:grid-cols-2 xl:grid-cols-4">
            <InfoCard 
              title="Referral Code"
              value={user!.player_code}
              img={referral}
              children={<p className='p-2 rounded-full absolute top-2 right-2 bg-[#b9b9c5] cursor-pointer' onClick={handleCopyClick}><MdOutlineContentCopy  className='w-3 h-3'/></p>}
            />
            <InfoCard 
              title="STN Balance"
              value={`0.0${user!.stone_token}`}
              img={balance}
            />
            <InfoCard 
              title="Latest Score"
              value="12"
              img={score}
            />
            <InfoCard 
              title="Average Rating"
              value="67%"
              img={average}
            />
            
          </div>
  </div>
  )
}

export default DashboardHome