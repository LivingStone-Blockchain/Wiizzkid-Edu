import React from 'react';
import Button from '../components/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper";
import { useNavigate } from 'react-router-dom';
import { errorRed, errorBlue, errorGreen, errorOne, errorTwo, errorThree } from '../assets/notFound';
import logo from './../assets/header/wiizzkid-logo.png';

const NotFound = () => {
    const navigate = useNavigate();

    type dataType = {
        id: number,
        img: string,
        color: string,
        mailImg: string
    }

    const data: dataType[] = [
        {
            id: 1,
            img: errorOne,
            color: '#ff5d5d',
            mailImg: errorRed,
        },
        {
            id: 2,
            img: errorTwo,
            color: '#5b72ee',
            mailImg: errorBlue,
        },
        {
            id: 3,
            img: errorThree,
            color: '#37b9b2',
            mailImg: errorGreen,
        }
    ]

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
                     <h3 className="sm:text-2xl text-xl text-[#252641]"><b>404 - PAGE NOT FOUND!</b></h3>
                     <img src={mailImg} alt="mail" className='flex justify-center items-center mx-auto w-full h-auto max-w-[60px]'/>
                     <p className='sm:text-base text-sm'>We can't seem to find the page you're looking for.</p>
                     <p className='sm:text-base text-sm'>Here are some helpful links instead:</p>
                     <div className="flex flex-row space-x-3 justify-center mt-3 w-full mx-auto">
                      <Button 
                          children='Home'
                          type='button'
                          onClick={() => navigate('/')}
                          className='flex-initial md:w-36 w-28 text-white mx-auto sm:mx-0 font-semibold px-5 py-3  bg-[#252641]'
                      />              
                      <Button 
                          children='Log in'
                          type='button'
                          onClick={() => navigate('/login')}
                          className='flex-initial md:w-36 w-28 text-white mx-auto sm:mx-0 font-semibold px-5 py-3  bg-[#252641]'
                      />
            </div>
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

export default NotFound;