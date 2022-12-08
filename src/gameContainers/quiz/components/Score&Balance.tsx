import React, { useContext } from 'react'
import { UserContext, UserContextType } from '../../../context/user.context';


const ScoreBalance = () => {
    const { user } = useContext(UserContext) as UserContextType;

    const boardData =[
        {
          title: "Balance",
          value: user?.stone_token,
        },
        {
          title: "Score",
          value: 0,
        }
      ] 
  return (
    <div className='absolute md:bottom-5 bottom-[14px] md:right-16 right-4 mx-auto text-white flex gap-4 items-center justify-center md:text-base text-sm'> 
           <div className={`bg-gray-100 border-4 text-center flex w-[120px] md:w-[160px] p-1 md:p-2 items-center justify-center shadow-lg rounded-md border-[#37b9b2]`}>
            {boardData.map((item) => (
              <div className="col-4" key={item.title}>
              <div className={`text-[#37b9b2] md:text-base text-sm bg-gray-200 md:p-2 p-[2px] font-semibold border-x border-gray-300`}>
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