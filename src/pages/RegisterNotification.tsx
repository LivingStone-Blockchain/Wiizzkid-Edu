import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper";
import { UserContext, UserContextType } from '../context/user.context'
import { useNavigate } from 'react-router-dom';
import { mailRed, mailGreen, mailBlue, girlBlue, girlGreen, girlRed } from '../assets/registerNotify';
import { LoadingToRedirect } from '../components/index';
import logo from './../assets/header/wiizzkid-logo.png';


type dataType = {
    id: number,
    img: string,
    color: string,
    mailImg: string
}

const data: dataType[] = [
    {
        id: 1,
        img: girlRed,
        color: '#ff5d5d',
        mailImg: mailRed,
    },
    {
        id: 2,
        img: girlBlue,
        color: '#5b72ee',
        mailImg: mailBlue,
    },
    {
        id: 3,
        img: girlGreen,
        color: '#37b9b2',
        mailImg: mailGreen,
    }
]


const RegisterNotification = () => {
    const { emailNotify, user } = useContext(UserContext) as UserContextType;
    const navigate = useNavigate();

    
  //restrict access to page for logged users
  if (user) {
    return (
      <><LoadingToRedirect /></>
    )
  }

    return (
        <div data-aos="fade-up" data-aos-once="true" data-aos-delay="500" className="flex items-center min-h-screen p-6 bg-gray-50">
            <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
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
                >
                    {data.map(({ id, img, color, mailImg }) => (

                        <SwiperSlide key={id}>
                             <div className={`relative  top-5 left-5 flex justify-center items-center border-2  h-12 w-12 rounded-lg p-1`} style={{borderColor: `${color}`}}>
                        <img className='w-full h-auto max-w-[50px]' src={logo} alt="wiizzkid logo" />
                    </div>

                            <div className="flex flex-col overflow-y-auto md:flex-row">
                                <div className="md:h-auto md:w-1/2">
                                    <img
                                        aria-hidden="true"
                                        loading='lazy'
                                        className="object-cover w-full h-full"
                                        src={img}
                                        alt='mail girl'
                                    />
                                </div>
                                <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                                    <div className='flex flex-col justify-center items-center gap-6 w-full text-center'>
                                        <h3 className="sm:text-2xl text-xl">Thank you for signing up for a Wiizzkid account!</h3>
                                        <img src={mailImg} alt="mail" className='flex justify-center items-center mx-auto w-full h-auto max-w-[60px]' />
                                        <p className='sm:text-base text-sm'>Please check your email <span className='font-semibold'>({emailNotify})</span> to confirm your account.</p>
                                        <p className='sm:text-base text-sm'>If <span className='font-semibold'>{emailNotify}</span> is not your email address, please <span onClick={() => navigate('/register')} className="underline cursor-pointer" style={{ color: color }}>go back</span> and enter a correct one.</p>
                                    </div>
                                </div>
                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default RegisterNotification;