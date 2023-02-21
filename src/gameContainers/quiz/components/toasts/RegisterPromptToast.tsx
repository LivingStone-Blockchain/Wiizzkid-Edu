import {FC} from 'react';
import { authRed, authGreen, authBlue } from "../../../../assets/registerPrompt/index";
import Button from "../button/Button";
import { NavigateFunction } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper";
import { toast } from 'react-hot-toast';



type PromptPropsType = {
  score: number, 
  timeDiffCalculator: string, 
  setStart: (value: React.SetStateAction<boolean>) => void, 
  setTriviaFetch: (value: React.SetStateAction<boolean>) => void, 
  setShowCreateGameModal: (value: React.SetStateAction<boolean>) => void, 
  navigate: NavigateFunction,
  showRegisterPrompt: boolean,
  setShowRegisterPrompt: (value: React.SetStateAction<boolean>) => void, 
}

type dataType = {
  id: number,
  img: string,
  color: string,
}

const data: dataType[] = [
  {
      id: 1,
      img: authRed,
      color: '#ff5d5d',
  },
  {
      id: 2,
      img: authBlue,
      color: '#5b72ee',
  },
  {
      id: 3,
      img: authGreen,
      color: '#37b9b2',
  }
]


const RegisterPromptToast: FC<PromptPropsType> = ({score, timeDiffCalculator, setStart, setTriviaFetch, setShowCreateGameModal, navigate, showRegisterPrompt, setShowRegisterPrompt}) => {

  return(
     
    <div className={`flex items-center justify-center lg:w-4/5 w-[90%] z-[100] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform transition-all ease-in-out duration-700 rounded-lg ${showRegisterPrompt ? 'scale-[1]' : 'scale-0'}`}>
    <div className="h-full w-full mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
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
            {data.map(({ id, img, color }) => (

                <SwiperSlide key={id}>
                    <div className="flex flex-col overflow-y-auto md:flex-row">
                        <div className="md:h-auto md:w-1/2">
                            <img
                                aria-hidden="true"
                                loading='lazy'
                                className="object-cover w-full h-full transition-all duration-700 ease-in-out hover:scale-[0.95]"
                                src={img}
                                alt='party'
                            />
                        </div>
                        <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                            <div className='flex flex-col justify-center items-center gap-6 w-full text-center'>
                                <h3 className="sm:text-2xl text-xl w-full">Great news! You've successfully completed Wiizzkid free mode.</h3>
                                <p className="mt-6 border-2 rounded-lg text-xl bg-gray-200 px-4 py-2 font-bold text-navy"  style={{borderColor: `${color}`}}>   
                                    Score: {score}
                                </p>
                                <p className="mt-2 text-gray-500 space-x-5 my-3 md:text-base text-sm leading-relaxed">
                                    {`Completion Time: ${timeDiffCalculator} mins.`}
                                </p>
                                <p className='sm:text-base text-sm'>To access even more great features and content, sign up for Wiizzkid Premium!</p>
                                <div className="flex flex-row space-x-3 justify-center mt-3 w-full mx-auto">
                                  <Button 
                                      children='Sign up'
                                      type='button'
                                      onClick={() => { toast.dismiss(); setStart(false); setTriviaFetch(false); setShowCreateGameModal(false); setShowRegisterPrompt(false); navigate('/register') }}
                                      className='flex-initial w-36 text-white mx-auto sm:mx-0 font-semibold px-5 py-3  bg-[#252641]'
                                  />              
                                  <Button 
                                      children='Home'
                                      type='button'
                                      onClick={() => { toast.dismiss(); setStart(false); setTriviaFetch(false); setShowCreateGameModal(false); setShowRegisterPrompt(false); navigate('/quiz-home') }}
                                      className='flex-initial w-36 text-white mx-auto sm:mx-0 font-semibold px-5 py-3  bg-[#252641]'
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

export default RegisterPromptToast;
