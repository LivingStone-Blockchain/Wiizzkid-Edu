import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper";
import { useNavigate, Link } from 'react-router-dom';
import { girl, vr, pcboy, vrgirl, logo, ninja } from "../assets/header/index";
import { AiFillCalculator } from 'react-icons/ai';
import { FaGamepad, FaTimes } from 'react-icons/fa';
import { GiMonkey } from 'react-icons/gi'
import { MdOutlineLogout, MdOutlineSpaceDashboard, MdOutlineAccountBalanceWallet } from 'react-icons/md';
import Button from './Button'


type headerDataType = {
    id: number,
    colorDeep: string
    colorLight: string
    tagline: string
    text: string,
    shadow:string,
    mobileShadow: string
    img: string,
}

const data:headerDataType[] = [
    {
        id: 1,
        colorDeep: '#FF3939',
        colorLight: '#ffedef',
        tagline: "change",
        text: 'Wiizzkid Culture is about to revolutionize the face of education across the world using the blockchain technology.',
        shadow: '0px 10px 20px rgba(255, 57, 57, 0.4)',
        mobileShadow: '0px 5px 20px rgba(255, 57, 57, 0.4)',
        img: girl,
    },
    {
        id: 2,
        colorDeep: '#e0b00d',
        colorLight: '#fff2e1',
        tagline: "future",
        text: "Once we understand the metaverse's transforming power, we see education in a different light.",
        shadow: '0px 10px 20px rgba(238, 187, 13, 0.4)',
        mobileShadow: '0px 5px 20px rgba(238, 187, 13, 0.4)',
        img: vrgirl,
    },
    {
        id: 3,
        colorDeep: '#37b9b2',
        colorLight: '#e5fbfa',
        tagline: "Wiizzkids",
        text: "We are providing a decentralized educational system in a rewarding hybrid educational environment.",
        shadow: '0px 10px 20px rgba(55,185,178, 0.4)',
        mobileShadow: '0px 5px 20px rgba(55, 185, 178, 0.4)',
        img: pcboy,
    }
]

const Header = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState<boolean>(false);

    console.log(mobileDropdownOpen)


    //prevent scroll when profile dropdown is clicked
    useEffect(() => {
        const body = document.querySelector('body');
        if(mobileDropdownOpen) {
            body!.style.overflow = "hidden";
        }
       else {
        body!.style.overflowY = "scroll";
        body!.style.overflowX = "hidden";
       }
    }, [mobileDropdownOpen])


    return (
        <Swiper
            spaceBetween={30}
            speed={3000}
            autoplay={{
                delay: 7000,
                disableOnInteraction: false,
            }}
            effect={"fade"}
            fadeEffect={{
                crossFade: true,
            }}
            modules={[Autoplay, EffectFade]}
            className="mySwiper"
            id="header"
        >
            {data.map(({ id, colorDeep, colorLight, tagline, text, shadow, mobileShadow, img }) => (
                <SwiperSlide key={id} style={{ backgroundColor: `${colorLight}`}}>
                    {/*header section*/}
                    <div className="lg:absolute lg:top-0 lg:left-0 z-20 lg:flex lg:w-full lg:items-center">

                        <header className="w-full text-gray-700">
                            <div className="flex flex-col max-w-screen-xl px-8 mx-auto lg:items-center lg:justify-between lg:flex-row">
                                <div className="flex flex-row items-center justify-between md:pt-8 pt-6">
                                    <div className={`flex justify-center items-center border-2  h-14 w-14 rounded-lg p-1`} style={{ borderColor: `${colorDeep}` }}>
                                        <img className='w-full h-auto max-w-[50px]' src={logo} alt="wiizzkid logo" />
                                    </div>
                                    <button className={`rounded-lg lg:hidden focus:outline-none focus:shadow-outline ${mobileDropdownOpen && 'pointer-events-none'}`} onClick={() => setOpen(!open)}>
                                        <svg fill="currentColor" viewBox="0 0 20 20" className="w-7 h-7">
                                            {open ? (
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                            ) : (
                                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                            )}
                                        </svg>
                                    </button>
                                </div>
                                <nav className={`lg:h-auto flex flex-col flex-grow lg:items-center pb-4 lg:pb-0 lg:flex lg:justify-end lg:flex-row origin-top duration-300 ${open ? 'h-full scale-y-1' : 'h-0 transform lg:transform-none scale-y-0'}`}>
                                    {/*mobile profile*/}
                                    <div className="relative lg:pl-8 mt-10 mb-5 lg:mt-8 md:text-base text-sm block lg:hidden">
                                        <button className="flex gap-1 justify-center items-center relative z-10 rounded-full bg-white p-2 focus:outline-none border border-gray-300" onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}>
                                            <img
                                                loading="lazy"
                                                width="220"
                                                height="220"
                                                src={ninja}
                                                alt="member photo"
                                                className="h-8 w-8 rounded-full object-cover"
                                            />
                                            <svg className="h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>

                                       
                                        {mobileDropdownOpen && (
                                            <div data-aos="fade-up" data-aos-delay="100" className="absolute left-0 mt-3 w-full md:w-96 z-40">
                                                <div className="bg-white rounded-xl overflow-hidden shadow-xl z-50">
                                                    <div className="text-center p-6 bg-[#252641] border-b relative">
                                                        <FaTimes className='text-white absolute right-4 top-4 cursor-pointer' onClick={() => setMobileDropdownOpen(false)}/>
                                                        {/*<svg aria-hidden="true" role="img" className="h-24 w-24 text-white rounded-full mx-auto" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M172 120a44 44 0 1 1-44-44a44 44 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-153.8 58.4a81.3 81.3 0 0 1 24.5-23a59.7 59.7 0 0 0 82.6 0a81.3 81.3 0 0 1 24.5 23A87.6 87.6 0 0 0 216 128Z"></path></svg>*/}
                                                        <p className="pt-2 text-lg font-semibold text-gray-50">John Doe</p>
                                                        <p className="text-sm text-gray-100">John@Doe.com</p>
                                                        <div className="mt-5">
                                                            <a
                                                                className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100 cursor-pointer"
                                                            >
                                                                Manage your Account
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="border-b">
                                                        <Link to="/dashboard" className="px-4 py-3 hover:bg-gray-100 flex">
                                                                <div className="text-gray-800">
                                                                    <MdOutlineSpaceDashboard className="w-4 h-4" />
                                                                </div>
                                                                <div className="pl-3">
                                                                    <p className="text-sm font-medium text-gray-800 leading-none">
                                                                        Dashboard
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">View your campaigns</p>
                                                                </div>
                                                        </Link>
                                                        <Link to="/account/donations" className="px-4 py-3 hover:bg-gray-100 flex">     
                                                               <div className="text-gray-800">
                                                                    <MdOutlineAccountBalanceWallet />
                                                                </div>
                                                                <div className="pl-3">
                                                                    <p className="text-sm font-medium text-gray-800 leading-none">Buy Stone</p>
                                                                    <p className="text-xs text-gray-500">Credit your wallet to play</p>
                                                                </div>
                                                        </Link>
                                                    </div>

                                                    <div>
                                                        <button className="w-full px-4 py-3 pb-4 hover:bg-gray-100 flex gap-4">
                                                            <MdOutlineLogout className="text-gray-500 h-4 w-4" />
                                                            <p className="text-sm font-medium text-gray-500 leading-none"> Logout</p>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <a className= {`${mobileDropdownOpen && 'blur-2xl'} px-4 py-2 mt-2 md:text-base text-sm bg-transparent rounded-lg lg:mt-8 lg:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline`} href="#home" onClick={() => {setOpen(false)}}>Home</a>
                                    <a className= {`${mobileDropdownOpen && 'blur-2xl'} px-4 py-2 mt-2 md:text-base text-sm bg-transparent rounded-lg lg:mt-8 lg:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline`} href="#quiz" onClick={() => setOpen(false)}>Wiizzkid Quiz</a>
                                    <a className= {`${mobileDropdownOpen && 'blur-2xl'} px-4 py-2 mt-2 md:text-base text-sm bg-transparent rounded-lg lg:mt-8 lg:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline`} href="#metaverse" onClick={() => setOpen(false)}>Wiizzkid Metaverse</a>
                                    <a className= {`${mobileDropdownOpen && 'blur-2xl'} px-4 py-2 mt-2 md:text-base text-sm bg-transparent rounded-lg lg:mt-8 lg:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline`} href="#" onClick={() => setOpen(false)}>Roadmap</a>
                                    <a className={`${mobileDropdownOpen && 'blur-2xl'} px-4 py-2 mt-2 md:text-base text-sm bg-transparent rounded-lg lg:mt-8 lg:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline`}  href="#blog" onClick={() => setOpen(false)}>Blog</a>

                                    <Button
                                        className={`${mobileDropdownOpen && 'blur-2xl'} px-10 py-3 mt-2 md:text-base text-sm text-center bg-white text-gray-800 lg:mt-8 lg:ml-4`}
                                        children="Login"
                                        onClick={() => { navigate('/login'); setOpen(false) }}
                                    />

                                    <Button
                                        className={`${mobileDropdownOpen && 'blur-2xl'} px-10 py-3 mt-3 md:text-base text-sm text-center text-white lg:mt-8 lg:ml-4`}
                                        children="Connect Wallet"
                                        style={{ backgroundColor: `${colorDeep}` }}
                                    />

                                    {/*large screen profile*/}
                                    <div className="relative lg:pl-8 mt-2 lg:mt-8 md:text-base text-sm hidden lg:block">
                                        <button className="flex gap-1 justify-center items-center relative z-10 rounded-full bg-white p-2 focus:outline-none border border-gray-300" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                            <img
                                                loading="lazy"
                                                width="220"
                                                height="220"
                                                src={ninja}
                                                alt="member photo"
                                                className="h-8 w-8 rounded-full object-cover"
                                            />
                                            <svg className="h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>

                                       
                                        {dropdownOpen && (
                                            <div data-aos="fade-up" data-aos-delay="100" className="absolute right-0 mt-3 w-72 z-40">
                                                <div className="bg-white rounded-xl overflow-hidden shadow-xl z-50">
                                                    <div className="text-center p-6 bg-[#252641] border-b">
                                                        {/*<svg aria-hidden="true" role="img" className="h-24 w-24 text-white rounded-full mx-auto" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M172 120a44 44 0 1 1-44-44a44 44 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-153.8 58.4a81.3 81.3 0 0 1 24.5-23a59.7 59.7 0 0 0 82.6 0a81.3 81.3 0 0 1 24.5 23A87.6 87.6 0 0 0 216 128Z"></path></svg>*/}
                                                        <p className="pt-2 text-lg font-semibold text-gray-50">John Doe</p>
                                                        <p className="text-sm text-gray-100">John@Doe.com</p>
                                                        <div className="mt-5">
                                                            <a
                                                                className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100 cursor-pointer"
                                                            >
                                                                Manage your Account
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="border-b">
                                                        <Link to="/dashboard" className="px-4 py-2 hover:bg-gray-50 flex">
                                                        
                                                                <div className="text-gray-800">
                                                                    <MdOutlineSpaceDashboard className="w-4 h-4" />
                                                                </div>
                                                                <div className="pl-3">
                                                                    <p className="text-sm font-medium text-gray-800 leading-none">
                                                                        Dashboard
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">View your campaigns</p>
                                                                </div>
                                                        
                                                        </Link>
                                                        <Link to="/account/donations" className="px-4 py-2 hover:bg-gray-50 flex">
                                                                <div className="text-gray-800">
                                                                    <MdOutlineAccountBalanceWallet />

                                                                </div>
                                                                <div className="pl-3">
                                                                    <p className="text-sm font-medium text-gray-800 leading-none">Buy Stone</p>
                                                                    <p className="text-xs text-gray-500">Credit your wallet to play</p>
                                                                </div>
                                                        </Link>
                                                    </div>

                                                    <div>
                                                        <button className="w-full px-4 py-2 pb-4 hover:bg-gray-50 flex gap-4">
                                                            <MdOutlineLogout className="text-gray-500 h-4 w-4" />
                                                            <p className="text-sm font-medium text-gray-500 leading-none"> Logout</p>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>


                                </nav>
                            </div>
                        </header>
                    </div>

                    {/*hero section */}
                    <div id="home" className={`${mobileDropdownOpen && 'md:blur-0 blur-2xl'} max-w-screen-xl px-8 mx-auto flex flex-col lg:flex-row items-start z-10 relative overflow-hidden pt-[30px] md:pt-[90px] lg:pt-[120px]`} onClick={() => setDropdownOpen(false)}>
                        <div className="flex flex-col w-full lg:w-6/12 justify-center lg:pt-24 items-start text-center lg:text-left mb-5 md:mb-0">
                            <h1 data-aos="fade-right" data-aos-once="true" className="my-4 text-4xl md:text-5xl font-bold leading-tight text-darken">We are the <span style={{ color: `${colorDeep}` }}>{tagline}</span></h1>
                            <p data-aos="fade-down" data-aos-once="true" data-aos-delay="300" className="leading-normal md:text-2xl text-xl mb-8">{text}</p>
                            <div className="w-full md:flex items-center justify-center lg:justify-start md:space-x-5">
                                <Button 
                                    children="Buy Stone Token"
                                    className='lg:mx-0 text-white text-xl font-bold py-4 px-9 focus:outline-none '
                                    style={window.innerWidth > 767 ? { backgroundColor: `${colorDeep}`, boxShadow: `${shadow}` } : { backgroundColor: `${colorDeep}`, boxShadow: `${mobileShadow}` }}
                                />
                            </div>

                        </div>

                        <div className="w-full lg:w-6/12 lg:-mt-10 relative" id="girl">
                            <img data-aos="fade-up" data-aos-once="true" className="w-10/12 mx-auto 2xl:-mb-20" loading='lazy' src={img} />



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


                </SwiperSlide>
            ))}
        </Swiper>

    )
}

export default Header;