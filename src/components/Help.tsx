import React from 'react';
import {logo} from './../assets/header/index';
import Button from './Button';
import { useNavigate } from 'react-router-dom';


const Help = () => {
    const navigate = useNavigate();

  return (
    <div className={`mt-24 w-full md:h-96 h-80 bg-navy bg-right-top bg-no-repeat relative`} style={window.innerWidth > 768 ? {backgroundImage: `url(${logo})`} : {backgroundImage: `url(${logo})`, backgroundSize: `250px`, backgroundPosition: '230px 50%'}}>
        <div className='absolute inset-0 py-16 px-4 md:px-8 bg-gradient-to-r from-navy to-navyLight opacity-60'></div>
        <div className="flex lg:px-16 px-4 md:px-8 flex-col h-full w-full items-start justify-center relative">
            <h1 className="md:text-2xl text-xl font-semibold text-white">Enquiring about <span className="text-tomato">Wiizzkid</span>?</h1>
            <p className="space-x-5 my-6 text-white md:text-base text-sm leading-relaxed z-1 lg:w-1/2 md:w-4/5">Are you new to crypto and interested in purchasing STN or seeking to consult with our team? Are you intrigued by the potential of Learn-to-Earn and eager to get involved, but unsure of how to begin your journey?</p>
                <Button 
                    children='Contact us'
                    onClick={() => navigate('/about')}
                    type='submit'
                    className='flex-initial w-36 text-white sm:mx-0 font-semibold px-5 py-3  bg-[#252641] shadow-btn-darken '
                    style={{background: "linear-gradient(105.5deg, #545AE7 19.57%, #393FCF 78.85%)"}}
                />
        </div>
        </div>
  )
}

export default Help