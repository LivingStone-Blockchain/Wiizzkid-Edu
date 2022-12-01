import React from 'react';
import { Banner, GameModes, Contact } from '../components';
import { classroom} from '../assets/about';


const About = () => {
  return (
    <>
        <Banner 
            title='About Wiizzkids...'
        />

      <div className='container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-500'>
      <div className="sm:flex items-center sm:space-x-8 md:py-20 py-16">
			<div data-aos="fade-right" className="sm:w-1/2 relative">
				<div className="bg-yellow-500 rounded-full absolute w-12 h-12 z-0 -left-4 -top-3 animate-pulse"></div>
				<h1 className="font-semibold text-2xl relative z-50 text-darken lg:pr-10">Step into the future today and make it happen, <span className="text-yellow-500">the future is now.</span></h1>
				<p className="py-5 lg:pr-32 md:text-base text-sm leading-relaxed text-gray-500">We want to change the methodologies of teaching across the world using the blockchain technology while kids learn in a fun and exiting way.</p>
				<p className="pt-0 pb-5 lg:pr-32 md:text-base text-sm leading-relaxed text-gray-500">You can play in 3 different modes(London, Shanghai and Beijing).The London mode is the easiest while the Beijing is the hardest.You would be able to accumulate points as you play the game which can then be converted to Stones.</p>
			</div>
			<div data-aos="fade-left" className="sm:w-1/2 relative mt-10 sm:mt-0">
				<div style={{background: "#37b9b2"}} className="floating w-24 h-24 absolute rounded-lg z-0 -top-3 -left-3"></div>
				<img className="rounded-xl z-40 relative" src={classroom} alt="class" loading='lazy'/>
				<div className="bg-yellow-500 w-40 h-40 floating absolute rounded-lg z-10 -bottom-3 -right-3"></div>
			</div>
		</div>
      <GameModes />
	  <Contact />
      </div>
    </>
  )
}

export default About;