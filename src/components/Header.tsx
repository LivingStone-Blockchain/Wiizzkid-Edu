import { useState } from 'react';
import logo from '../assets/header/wiizzkid-logo.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper";
import { useNavigate } from 'react-router-dom';


const headData = [
    {
        id: 1,
        colorDeep: '#FF3939',
        colorLight: '#ffedef',
    },
    {
        id: 2,
        colorDeep: '#e0b00d',
        colorLight: '#fff2e1',
    },
    {
        id: 3,
        colorDeep: '#37b9b2',
        colorLight: '#e5fbfa',
    }
]

const Header = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    
  return (
    <Swiper
    spaceBetween={30}
    speed={3000}
    autoplay={{
      delay: 7000,
      disableOnInteraction: false,
    }}
    effect={"fade"}
   fadeEffect= {{
      crossFade: true,
    }}
    modules={[Autoplay, EffectFade]}
    className="mySwiper"
  >
    {headData.map(({id, colorDeep, colorLight}) => (
         <SwiperSlide key={id} style={{backgroundColor: `${colorLight}`}}>
         <header className="w-full text-gray-700">
             <div className="flex flex-col max-w-screen-xl px-8 mx-auto lg:items-center lg:justify-between lg:flex-row">
                 <div className="flex flex-row items-center justify-between py-6">
                     <div className={`flex justify-center items-center border-2  h-14 w-14 rounded-lg p-1`} style={{borderColor: `${colorDeep}`}}>
                        <img className='w-full h-auto max-w-[50px]' src={logo} alt="wiizzkid logo" />
                    </div>
                     <button className="rounded-lg lg:hidden focus:outline-none focus:shadow-outline" onClick={() => setOpen(!open)}>
                         <svg fill="currentColor" viewBox="0 0 20 20" className="w-7 h-7">
                             {open ?  (
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                             ) : (
                                 <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
                             )}
                         </svg>
                     </button>
                 </div>
                 <nav className={`lg:h-auto flex flex-col flex-grow lg:items-center pb-4 lg:pb-0 lg:flex lg:justify-end lg:flex-row origin-top duration-300 ${open ? 'h-full scale-y-1' : 'h-0 transform lg:transform-none scale-y-0'}`}>
                     <a className="px-4 py-2 mt-2 md:text-base text-sm bg-transparent rounded-lg lg:mt-8 lg:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline" href="#home">Home</a>
                     <a className="px-4 py-2 mt-2 md:text-base text-sm bg-transparent rounded-lg lg:mt-8 lg:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline" href="#quiz">Wiizzkid Quiz</a>
                     <a className="px-4 py-2 mt-2 md:text-base text-sm bg-transparent rounded-lg lg:mt-8 lg:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline" href="#metaverse">Wiizzkid Metaverse</a>
                     <a className="px-4 py-2 mt-2 md:text-base text-sm bg-transparent rounded-lg lg:mt-8 lg:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline" href="#">Roadmap</a>
                     <a className="px-4 py-2 mt-2 md:text-base text-sm bg-transparent rounded-lg lg:mt-8 lg:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline" href="#blog">Blog</a>
                     <button className="px-10 py-3 mt-2 md:text-base text-sm text-center bg-white text-gray-800 rounded-full lg:mt-8 lg:ml-4" onClick={() => navigate('/login')}>Login</button>
                     <button className="px-10 py-3 mt-2 md:text-base text-sm text-center text-white rounded-full lg:mt-8 lg:ml-4" style={{backgroundColor: `${colorDeep}`}}>Connect Wallet</button>
                 </nav>
             </div>
         </header>
         </SwiperSlide>
    ))}    
</Swiper>
  )
}

export default Header


