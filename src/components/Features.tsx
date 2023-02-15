import React from 'react'
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaImage,  } from 'react-icons/fa';
import {  MdGeneratingTokens } from 'react-icons/md';
import { vr } from "../assets/header/index";


const Features = () => {
  return (

  <div className="m-auto text-gray-500 mt-24">
     <div data-aos="flip-up" className="text-center max-w-screen-lg mx-auto">
			<h1 className="md:text-3xl text-2xl font-bold mb-4 text-navy">Who are <span className="text-tomato">The Wiizzkids?</span></h1>
			<p className="text-gray-500 md:text-base text-sm leading-relaxed">Wiizzkid is a comprehensive learning platform that combines cutting-edge blockchain technologies with innovative features to provide a unique and engaging educational experience for students and educators alike.</p>
		</div>
    <div data-aos="fade-up" data-aos-delay="100" 
      className="mt-16 grid divide-x divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4"
    >
      <div className="group relative bg-white transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 hover:bg-tomatoLighter">
        <div className="relative space-y-8 py-12 p-8">
          <div className="w-16 h-16 flex items-center justify-center gap-4 rounded-full bg-tomatoLighter group-hover:bg-white">  
            <FaGraduationCap className="w-6 h-6 m-auto text-tomato" />
          </div>

          <div className="space-y-2">
            <h5
              className="font-medium transition group-hover:text-primary md:text-xl text-lg text-navy"
            >
              Hybrid Education
            </h5>
            <p className="text-gray-500 md:text-base text-sm leading-relaxed">
            Learn from anywhere, at any time, and on any device. Whether you're a student looking to enhance your knowledge and skills, or an educator seeking to reach more students and provide a personalized learning experience, Wiizzkid has something to offer.
            </p>
          </div>
        </div>
      </div>
      <div className="group relative bg-white transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 hover:bg-goldenLighter">
        <div className="relative space-y-8 py-12 p-8">
        <div className="w-16 h-16 flex items-center justify-center gap-4 rounded-full bg-goldenLighter group-hover:bg-white">  
                <MdGeneratingTokens className="w-6 h-6 m-auto text-golden" />
              </div>

          <div className="space-y-2">
            <h5
              className="font-medium md:text-xl text-lg mb-3  text-navy transition group-hover:text-primary"
            >
              Learn to Earn
            </h5>
            <p className="text-gray-500 md:text-base text-sm leading-relaxed">
            Wiizzkid incentivize students to learn by rewarding them with tokens that can be redeemed for various benefits, such as discounts on future quizzes, exclusive content, or even real-world prizes.
            </p>
          </div>
        </div>
      </div>
      <div className="group relative bg-white transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10 hover:bg-tealLighter">
        <div className="relative space-y-8 py-12 p-8">
        <div className="w-16 h-16 flex items-center justify-center gap-4 rounded-full bg-tealLighter group-hover:bg-white">  
          <FaImage className="w-6 h-6 m-auto text-teal" />      
        </div>

          <div className="space-y-2">
            <h5
              className="font-medium md:text-xl text-lg mb-3 text-navy transition group-hover:text-primary"
            >
              NFT Special
            </h5>
            <p className="text-gray-500 md:text-base text-sm leading-relaxed">
            By owning an NFT related to a specific topic, students can gain access to exclusive content and insights that can help them learn more about the topic before taking the quiz, ensuring a more comprehensive and effective learning experience.
            </p>
          </div>
          
        </div>
      </div>
      <div
        className="group relative bg-gray-50 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10"
      >
        <div
          className="relative space-y-8 py-12 p-8 transition duration-300 group-hover:bg-white"
        >
          <div className="w-16 h-16 flex items-center justify-center gap-4 rounded-full bg-white">  
            <img className='bg-navy bg-opacity-80 rounded-lg h-auto w-full max-w-[27px] p-1' src={vr} alt="vr" style={{ transform: "scaleX(-1)" }} /> 
            </div>

          <div className="space-y-2">
            <h5
              className="font-medium md:text-xl text-lg mb-3 text-navy transition group-hover:text-primary"
            >
              AR-powered Metaverse
            </h5>
            <p className="text-gray-500 md:text-base text-sm leading-relaxed">
            Wiizzkid is developing an AR-powered education world on the metaverse, which will allow students to explore and interact with educational content in a fun and engaging way.
            </p>
          </div>
          <Link to="/about" className="flex items-center justify-between group-hover:text-text-navy">
            <span className="sm:text-sm text-xs ">Read more</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>                
          </Link>
        </div>
      </div>
    </div>
  </div>

  )
}

export default Features;