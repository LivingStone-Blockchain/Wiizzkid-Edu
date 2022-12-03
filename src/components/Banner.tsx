import React, { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';



type BannerProps = {
    title: string
}

const Banner: FC<BannerProps> = ({title}) => {
    const location = useLocation();
    const navigate = useNavigate();


  return (
    <div
    className="relative z-10 overflow-hidden bg-[#252641] pt-[120px] pb-[100px] md:pt-[130px] lg:pt-[160px]"
  >
    <div className="container">
      <div className="-mx-4 flex flex-wrap items-center">
        <div className="w-full px-4">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-white">{title}</h1>
          </div>
          <p className='absolute md:bottom-10 bottom-7 left-4 md:left-16 right-0 mx-auto text-white flex gap-1 md:text-base text-sm'>
            <span className='text-xl cursor-pointer flex items-center justify-center hover:text-[#37b9b2]' onClick={() => navigate('/')}><FaHome /></span>
            <span className='flex items-center justify-center text-gray-300 px-1 font-medium'>{'>'}</span>
            <span className='text-[#37b9b2] font-medium'>{location.pathname.slice(1).split('/')[0]}</span>
          </p>
        </div>
      </div>
    </div>
    <div>
        <span className="absolute top-0 left-0 z-[-1]">
          <svg
            width="495"
            height="470"
            viewBox="0 0 495 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="55"
              cy="442"
              r="138"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="50"
            />
            <circle
              cx="446"
              r="39"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="20"
            />
            <path
              d="M245.406 137.609L233.985 94.9852L276.609 106.406L245.406 137.609Z"
              stroke="white"
              strokeOpacity="0.08"
              strokeWidth="12"
            />
          </svg>
        </span>
        <span className="absolute top-0 right-0 z-[-1]">
          <svg
            width="493"
            height="470"
            viewBox="0 0 493 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="462"
              cy="5"
              r="138"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="50"
            />
            <circle
              cx="49"
              cy="470"
              r="39"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="20"
            />
            <path
              d="M222.393 226.701L272.808 213.192L259.299 263.607L222.393 226.701Z"
              stroke="white"
              strokeOpacity="0.06"
              strokeWidth="13"
            />
          </svg>
        </span>
      </div>
    </div>
  )
}

export default Banner