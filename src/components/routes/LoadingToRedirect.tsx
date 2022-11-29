import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';



const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();


  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000)

    //redirect once count is 0
    count === 0 && navigate('/');

    return () => clearInterval(interval);
  }, [count])

  return (
    <div className='h-screen flex flex-col gap-4 justify-start items-center md:pt-48 pt-32'>
      <p className='text-2xl font-semibold'>Unauthorized Access!</p>
      <p className='flex justify-center items-center md:text-base text-sm'>Redirecting you in &nbsp;
        <span className='p-2 h-9 w-9 bg-[#cccdda] font-semibold border-[3px] border-[#252641] text-[#252641] md:text-xl text-lg rounded-full text-center flex items-center justify-center uppercase'>{count}</span> &nbsp;
        seconds.</p>
    </div>
  )
}

export default LoadingToRedirect