import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper";


import { girl, vr, pcboy, vrgirl } from "../assets/hero/index";
import { AiFillCalculator } from 'react-icons/ai';
import { FaGamepad } from 'react-icons/fa';
import { GiMonkey } from 'react-icons/gi'

const heroData = [
    {
        id: 1,
        tagline: "change",
        text: 'Wiizzkid Culture is about to revolutionize the face of education across the world using the blockchain technology.',
        colorDeep: '#FF3939',
        colorLight: '#ffedef',
        shadow: '0px 10px 20px rgba(255, 57, 57, 0.4)',
        mobileShadow:'0px 5px 20px rgba(255, 57, 57, 0.4)',
        img: girl,
    },
    {
        id: 2,
        tagline: "future",
        text: "Once we understand the metaverse's transforming power, we see education in a different light.",
        colorDeep: '#e0b00d',
        colorLight: '#fff2e1',
        shadow: '0px 10px 20px rgba(238, 187, 13, 0.4)',
        mobileShadow: '0px 5px 20px rgba(238, 187, 13, 0.4)',
        img: vrgirl,
    },
    {
        id: 3,
        tagline: "Wiizzkids",
        text: "We are providing a decentralized educational system in a rewarding hybrid educational environment.",
        colorDeep: '#37b9b2',
        colorLight: '#e5fbfa',
        shadow: '0px 10px 20px rgba(55,185,178, 0.4)',
        mobileShadow: '0px 5px 20px rgba(55, 185, 178, 0.4)',
        img: pcboy,
    }
];


const Hero = () => {
  return (
    <Swiper
      spaceBetween={30}
      speed={3000}
      autoplay={{
        delay: 7000,
        disableOnInteraction: true,
      }}
      effect={"fade"}
     fadeEffect= {{
        crossFade: true,
      }}
      modules={[Autoplay, EffectFade]}
      className="mySwiper"
      id="home"
    >
        {heroData.map(({id, tagline, text, colorDeep, colorLight, shadow, img, mobileShadow}) => (
              <SwiperSlide key={id} style={{backgroundColor: `${colorLight}`}}>
              <div className="max-w-screen-xl px-8 mx-auto flex flex-col lg:flex-row items-start">
                  <div className="flex flex-col w-full lg:w-6/12 justify-center lg:pt-24 items-start text-center lg:text-left mb-5 md:mb-0">
                      <h1 data-aos="fade-right" data-aos-once="true" className="my-4 text-4xl md:text-5xl font-bold leading-tight text-darken">We are the <span style={{color: `${colorDeep}`}}>{tagline}</span></h1>
                      <p data-aos="fade-down" data-aos-once="true" data-aos-delay="300" className="leading-normal md:text-2xl text-xl mb-8">{text}</p>
                      <div data-aos="fade-up" data-aos-once="true" data-aos-delay="700" className="w-full md:flex items-center justify-center lg:justify-start md:space-x-5">
                          <button className={`lg:mx-0 text-white text-xl font-bold rounded-full py-4 px-9 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out`} style={window.innerWidth > 767 ? {backgroundColor: `${colorDeep}`, boxShadow: `${shadow}`} : {backgroundColor: `${colorDeep}`, boxShadow: `${mobileShadow}`}}>
                              Buy Stone Token
                          </button>
                      </div>
                  </div>
              
                  <div className="w-full lg:w-6/12 lg:-mt-10 relative" id="girl">
                      <img data-aos="fade-up" data-aos-once="true" className="w-10/12 mx-auto 2xl:-mb-20" src={img} />
                  
      
      
                      <div data-aos="fade-up" data-aos-delay="300" data-aos-once="true" className="absolute top-20 -left-6 sm:top-32 sm:left-10 md:top-40 md:left-16 lg:-left-0 lg:top-52 floating-4">
                          <div className='bg-white rounded-lg h-12 sm:h-16 py-3 px-4 flex gap-4 justify-center items-center'>
                              <p className='bg-teally text-white rounded-md p-1 text-2xl'><AiFillCalculator /></p>
                              <p className='flex flex-col'>
                                  <span className='font-semibold text-gray-500 text-sm tracking-wide'>Multiply</span>
                                  <span className='text-xs text-gray-500 tracking-wide'>Timestable Wiizzkid</span>
                              </p>
                          </div>
                      </div>
          
      
                     
                      <div data-aos="fade-up" data-aos-delay="400" data-aos-once="true" className="absolute top-20 right-10 sm:right-24 sm:top-28 md:top-36 md:right-32 lg:top-32 lg:right-16 floating sm:block hidden">
                      <div className='bg-white rounded-lg h-12 sm:h-16 py-3 px-4 flex gap-4 justify-center items-center'>
                        <p className='bg-[#f25471] bg-opacity-80 text-white rounded-md p-1 text-2xl'><GiMonkey /></p>
                        <p className='flex flex-col'>
                                <span className='font-semibold text-gray-600 text-[13px] tracking-wide'>Wiizzkid NFT</span>
                                <span className='text-[11px] text-gray-600 tracking-wide font-medium'>Utility coming soon</span>
                              </p>
                        </div>
                      </div>
                      
                      
                      
                      <div data-aos="fade-up" data-aos-delay="300" data-aos-once="true" className="absolute bottom-20 md:bottom-48 lg:bottom-52 -right-6 lg:right-8 floating-4">
                          <div className='bg-white rounded-lg h-12 sm:h-16 py-3 px-4 flex gap-4 justify-center items-center'>
                              <p className='bg-[#f88c3d] text-white rounded-md p-1 text-xl'><FaGamepad /></p>
                              <p className='flex flex-col'>
                                  <span className='font-semibold text-gray-600 text-[13px] tracking-wide'>Wiizzkid Quizzes</span>
                                  <span className='text-[11px] text-gray-600 tracking-wide font-medium'>Test your knowledge here</span>
                              </p>
                          </div>
                      </div>
      
                      <div data-aos="fade-up" data-aos-delay="300" data-aos-once="true" className="sm:flex hidden flex-col gap-3 justify-center items-center bg-white rounded-lg h-24 sm:h-28 py-3 px-4 absolute bottom-14 -left-4 sm:left-2 sm:bottom-20 lg:bottom-24 lg:-left-4 floating">
                          <div className='flex gap-4 justify-center items-center'>
                              <img className='bg-[#f25471] bg-opacity-80 rounded-lg h-auto w-full max-w-[30px] p-1' src={vr} alt="vr" style={{transform: "scaleX(-1)"}}/>
                              <p className='flex flex-col'>
                                  <span className='font-semibold text-gray-500 text-[13px] tracking-wide'>Wiizzkid Metaverse</span>
                                  <span className='text-[11px] text-gray-500 tracking-wide font-medium'>Into the future</span>
                              </p>
                          </div>
                          <button className='lg:mx-0 bg-[#F25471] text-white text-[11px] font-sm rounded-full py-1.5 px-6 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out'>Join Now</button>
                      </div>
      
                  </div>
              </div>
              <div className="text-white -mt-14 sm:-mt-24 lg:-mt-36 z-40 relative">
                  <svg className="xl:h-40 xl:w-full" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                      <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" fill="currentColor"></path>
                  </svg>
                  <div className="bg-white w-full h-20 -mt-px"></div>
              </div>
        </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default Hero;