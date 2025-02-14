import React, { useEffect, useState, useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { girl, pcboy, vrgirl, logo, ninja } from "../assets/header/index";
import { FaTimes } from 'react-icons/fa';
import { MdOutlineLogout, MdOutlineSpaceDashboard, MdOutlineAccountBalanceWallet } from 'react-icons/md';
import Button from './Button';
import { ConnectWalletBtn, Hero } from './index';
import { UserContext, UserContextType } from '../context/user.context';
import { TokenContext, TokenContextType } from '../context/token.context';
import { utils } from "ethers";



type headerDataType = {
    id: number,
    colorDeep: string
    colorLight: string
    tagline: string
    text: string,
    shadow: string,
    mobileShadow: string
    img: string,
}

const data: headerDataType[] = [
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
        colorDeep: '#26a8a1',
        colorLight: '#e5fbfa',
        tagline: "Wiizzkids",
        text: "We are providing a decentralized educational system in a rewarding hybrid educational environment.",
        shadow: '0px 10px 20px rgba(38, 168, 161, 0.4)',
        mobileShadow: '0px 5px 20px rgba(38, 168, 161, 0.4)',
        img: pcboy,
    }
]

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState<boolean>(false);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState<boolean>(false);
    const { user, handleLogout } = useContext(UserContext) as UserContextType;
    const { stBalance } = useContext(TokenContext) as TokenContextType;
   

    //prevent scroll when profile dropdown is clicked
    useEffect(() => {
        const body = document.querySelector('body');
        if (mobileDropdownOpen) {
            body!.style.overflow = "hidden";
        }
        else {
            body!.style.overflowY = "scroll";
            body!.style.overflowX = "hidden";
        }
    }, [mobileDropdownOpen])


    //render only on homepage
    if (location.pathname !== "/") {
        return null;
    }


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
                <SwiperSlide key={id} style={{ backgroundColor: `${colorLight}` }}>
                    {/*header section*/}
                    <div className="lg:absolute lg:top-0 lg:left-0 z-20 lg:flex lg:w-full lg:items-center">

                        <header className="w-full text-gray-700">
                            <div className="flex flex-col max-w-screen-xl px-8 mx-auto lg:items-center lg:justify-between lg:flex-row">
                                <div className="flex flex-row items-center justify-between md:pt-8 pt-6">
                                    <div className={`flex justify-center items-center border-2  h-14 w-14 rounded-lg p-1`} style={{ borderColor: `${colorDeep}` }}>
                                        <img className='w-full h-auto max-w-[50px]' src={logo} alt="wiizzkid logo" width="50" height="80"/>
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
                                    {user && user?.tokens && (
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
                                                        <div className="text-center p-6 bg-navy border-b relative">
                                                            <FaTimes className='text-white absolute right-4 top-4 cursor-pointer' onClick={() => setMobileDropdownOpen(false)} />
                                                            {/*<svg aria-hidden="true" role="img" className="h-24 w-24 text-white rounded-full mx-auto" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M172 120a44 44 0 1 1-44-44a44 44 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-153.8 58.4a81.3 81.3 0 0 1 24.5-23a59.7 59.7 0 0 0 82.6 0a81.3 81.3 0 0 1 24.5 23A87.6 87.6 0 0 0 216 128Z"></path></svg>*/}
                                                            <p className="pt-2 text-lg font-semibold text-gray-50">{user?.full_name}</p>
                                                            <p className="text-sm text-gray-100">{user?.email}</p>
                                                            <div className="mt-5">
                                                                <a
                                                                    className="border rounded-full py-2 px-4 text-xs font-normal text-gray-100 cursor-pointer"
                                                                >
                                                                    Balance: <span className="text-xl font-semibold">{Number(utils.formatEther(stBalance)).toFixed(2)}</span> <span className="text-xs">STN</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="border-b">
                                                            <Link to="/dashboard-home" className="px-4 py-3 hover:bg-gray-100 flex" onClick={() => { setMobileDropdownOpen(false); setOpen(false) }}>
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
                                                            <Link to="/pricing" className="px-4 py-3 hover:bg-gray-100 flex" onClick={() => { setMobileDropdownOpen(false); setOpen(false) }}>
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
                                                            <button className="w-full px-4 py-3 pb-4 hover:bg-gray-100 flex gap-4" onClick={() => { setMobileDropdownOpen(false); setOpen(false) }}>
                                                                <MdOutlineLogout className="text-gray-500 h-4 w-4" />
                                                                <p className="text-sm font-medium text-gray-500 leading-none" onClick={handleLogout}> Logout</p>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}


                                    <a className={`${mobileDropdownOpen && 'blur-2xl'} px-4 py-2 mt-2 md:text-base text-sm bg-transparent rounded-lg lg:mt-8 lg:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline`} href="#home" onClick={() => { setOpen(false) }}>Home</a>
                                    <a className={`${mobileDropdownOpen && 'blur-2xl'} px-4 py-2 mt-2 md:text-base text-sm bg-transparent rounded-lg lg:mt-8 lg:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline`} href="#quiz" onClick={() => setOpen(false)}>Wiizzkid Quiz</a>
                                    <Link to="/ar-feature" className={`${mobileDropdownOpen && 'blur-2xl'} px-4 py-2 mt-2 md:text-base text-sm bg-transparent rounded-lg lg:mt-8 lg:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline`} onClick={() => setOpen(false)}>Wiizzkid AR</Link>
                                    <Link to='/roadmap' className={`${mobileDropdownOpen && 'blur-2xl'} px-4 py-2 mt-2 md:text-base text-sm bg-transparent rounded-lg lg:mt-8 lg:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline`} onClick={() => setOpen(false)}>Roadmap</Link>
                                    <a className={`${mobileDropdownOpen && 'blur-2xl'} px-4 py-2 mt-2 md:text-base text-sm bg-transparent rounded-lg lg:mt-8 lg:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline`} href="#blog" onClick={() => setOpen(false)}>Blog</a>

                                    {!user && (
                                        <Button
                                            className={`${mobileDropdownOpen && 'blur-2xl'} px-10 py-3 mt-2 md:text-base text-sm text-center bg-white text-gray-800 lg:mt-8 lg:ml-4`}
                                            children="Login"
                                            onClick={() => { navigate('/login'); setOpen(false) }}
                                        />
                                    )}

                                    {/*connect wallet*/}
                                    <ConnectWalletBtn
                                        colorDeep={colorDeep}
                                        mobileDropdownOpen={mobileDropdownOpen}
                                    />

                                    {/*<span className='mt-3 lg:mt-8  lg:ml-4 rounded-full bg-navy p-1'>
                                    <ConnectButton 
                                        chainStatus="none"
                                        label="Connect wallet"
                                        showBalance={false}
                                        accountStatus={{
                                            smallScreen: 'avatar',
                                            largeScreen: 'full',
                                          }}
                                       
                                    />
                                    </span>

                                    <Button
                                        className={`${mobileDropdownOpen && 'blur-2xl'} px-10 py-3 mt-3 md:text-base text-sm text-center text-white lg:mt-8 lg:ml-4`}
                                        children="Connect Wallet"
                                        style={{ backgroundColor: `${colorDeep}` }}
                                        />*/}


                                    {/*large screen profile*/}

                                    {user && user?.tokens && (
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
                                                        <div className="text-center p-6 bg-navy border-b">
                                                            {/*<svg aria-hidden="true" role="img" className="h-24 w-24 text-white rounded-full mx-auto" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M172 120a44 44 0 1 1-44-44a44 44 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-153.8 58.4a81.3 81.3 0 0 1 24.5-23a59.7 59.7 0 0 0 82.6 0a81.3 81.3 0 0 1 24.5 23A87.6 87.6 0 0 0 216 128Z"></path></svg>*/}
                                                            <p className="pt-2 text-lg font-semibold text-gray-50">{user?.full_name}</p>
                                                            <p className="text-sm text-gray-100">{user?.email}</p>
                                                            <div className="mt-5">
                                                                <a
                                                                    className="border rounded-full py-2 px-4 text-xs font-normal text-gray-100 cursor-pointer"
                                                                >
                                                                    Balance: <span className="text-xl font-semibold">{Number(utils.formatEther(stBalance)).toFixed(2)}</span> <span className="text-xs">STN</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="border-b">
                                                            <Link to="/dashboard-home" className="px-4 py-2 hover:bg-gray-50 flex" onClick={() => setDropdownOpen(false)}>

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
                                                            <Link to="/pricing" className="px-4 py-2 hover:bg-gray-50 flex" onClick={() => setDropdownOpen(false)}>
                                                                <div className="text-gray-800">
                                                                    <MdOutlineAccountBalanceWallet />

                                                                </div>
                                                                <div className="pl-3">
                                                                    <p className="text-sm font-medium text-gray-800 leading-none" >Buy Stone</p>
                                                                    <p className="text-xs text-gray-500">Credit your wallet to play</p>
                                                                </div>
                                                            </Link>
                                                        </div>

                                                        <div>
                                                            <button className="w-full px-4 py-2 pb-4 hover:bg-gray-50 flex gap-4" onClick={() => setDropdownOpen(false)}>
                                                                <MdOutlineLogout className="text-gray-500 h-4 w-4" />
                                                                <p className="text-sm font-medium text-gray-500 leading-none" onClick={handleLogout}> Logout</p>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                </nav>
                            </div>
                        </header>
                    </div>

                    {/*hero section */}
                    <Hero
                        colorDeep={colorDeep}
                        mobileDropdownOpen={mobileDropdownOpen}
                        text={text}
                        shadow={shadow}
                        mobileShadow={mobileShadow}
                        tagline={tagline}
                        setDropdownOpen={setDropdownOpen}
                        img={img}
                        user={user!}
                    />

                </SwiperSlide>
            ))}
        </Swiper>

    )
}

export default Header;