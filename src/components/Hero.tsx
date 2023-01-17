import React, { FC, useContext } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { AiFillCalculator } from 'react-icons/ai';
import { FaGamepad } from 'react-icons/fa';
import { GiMonkey } from 'react-icons/gi';
import { vr } from "../assets/header/index";
import { WiizzkidContext, WiizzkidContextType } from '../context/wiizzkid.context';



type HeroProps = {
    colorDeep: string,
    mobileDropdownOpen: boolean,
    text: string,
    shadow: string,
    mobileShadow: string,
    tagline: string,
    setDropdownOpen: (value: React.SetStateAction<boolean>) => void,
    img: string,
}


const Hero: FC<HeroProps> = ({ colorDeep, mobileDropdownOpen, text, shadow, mobileShadow, tagline, img, setDropdownOpen }) => {
    const navigate = useNavigate();
    const { setOpenVideo } = useContext(WiizzkidContext) as WiizzkidContextType;


    return (
        <>  
            <div id="home" className={`${mobileDropdownOpen && 'md:blur-0 blur-2xl'} max-w-screen-xl px-8 mx-auto flex flex-col lg:flex-row items-start z-10 relative overflow-hidden pt-[30px] md:pt-[90px] lg:pt-[120px]`} onClick={() => setDropdownOpen(false)}>
                <div className="flex flex-col w-full lg:w-6/12 justify-center lg:pt-24 items-start text-center lg:text-left mb-5 md:mb-0">
                    <h1 data-aos="fade-right" data-aos-once="true" className="my-4 text-4xl md:text-5xl lg:mx-0 mx-auto font-bold leading-tight text-navy">We are the <span style={{ color: `${colorDeep}` }}>{tagline}!</span></h1>
                    <p data-aos="fade-down" data-aos-once="true" data-aos-delay="300" className="leading-normal md:text-2xl text-lg mb-8 text-navy">{text}</p>
                    <div className="w-full md:flex items-center justify-center lg:justify-start md:space-x-5">
                        <Button
                            children="Buy Stone Token"
                            className='lg:mx-0 text-white text-xl font-bold py-4 px-9 focus:outline-none '
                            onClick={() => navigate('/pricing')}
                            style={window.innerWidth > 767 ? { backgroundColor: `${colorDeep}`, boxShadow: `${shadow}` } : { backgroundColor: `${colorDeep}`, boxShadow: `${mobileShadow}` }}
                        />

                        <div className="hidden items-center justify-center space-x-3 mt-7 md:mt-0 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out"  onClick={() => setOpenVideo(true)}>
                            <button className="bg-white w-14 h-14 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 ml-2" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.5751 12.8097C23.2212 13.1983 23.2212 14.135 22.5751 14.5236L1.51538 27.1891C0.848878 27.5899 5.91205e-07 27.1099 6.25202e-07 26.3321L1.73245e-06 1.00123C1.76645e-06 0.223477 0.848877 -0.256572 1.51538 0.14427L22.5751 12.8097Z" style={{ fill: `${colorDeep}` }} />
                                </svg>
                            </button>
                            <span className="cursor-pointer">Watch how it works</span>
                        </div>

                    </div>

                </div>

                <div className="w-full lg:w-6/12 lg:-mt-10 relative" id="girl">
                    <img data-aos="fade-up" data-aos-once="true" className="w-10/12 mx-auto 2xl:-mb-20" loading='lazy' src={img} />



                    <div data-aos="fade-up" data-aos-delay="300" data-aos-once="true" className="absolute top-20 -left-6 sm:top-32 sm:left-10 md:top-40 md:left-16 lg:-left-0 lg:top-52 floating-4">
                        <div className='bg-white rounded-lg h-12 sm:h-16 py-3 px-4 flex gap-4 justify-center items-center'>
                            <p className='bg-navy text-white rounded-md p-1 text-2xl'><AiFillCalculator /></p>
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
                            <img className='bg-[#f25471] bg-opacity-80 rounded-lg h-auto w-full max-w-[30px] p-1' src={vr} alt="vr" style={{ transform: "scaleX(-1)" }} />
                            <p className='flex flex-col'>
                                <span className='font-semibold text-gray-500 text-[13px] tracking-wide'>Wiizzkid Metaverse</span>
                                <span className='text-[11px] text-gray-500 tracking-wide font-medium'>Into the future</span>
                            </p>
                        </div>
                        <button className='lg:mx-0 bg-[#F25471] text-white text-[11px] font-sm rounded-full py-1.5 px-6 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out'>Join Now</button>
                    </div>

                </div>
            </div>
            <div className="text-white -mt-14 sm:-mt-24 lg:-mt-36 z-20 relative">
                <svg className="xl:h-40 xl:w-full" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" fill="currentColor"></path>
                </svg>
                <div className="bg-white w-full h-20 -mt-px"></div>
            </div>
        </>
    )
}

export default Hero