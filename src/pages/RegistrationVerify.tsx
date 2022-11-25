import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import NotFound from './NotFound';
import Preloader from '../components/Preloader';
import successGif from '../assets/registerVerify/check.gif';


const RegistrationVerify = () => {
  const [validUrl, setValidUrl] = useState<boolean>(false);
  const [delay, setDelay] = useState<boolean>(true);
  const param = useParams();
  const navigate = useNavigate();



  useEffect(() => {
    const verifyEmailUrl = async () => {

      const baseUrl = import.meta.env.VITE_HOST_BASE_URL;

      try {
        const url = `${baseUrl}/user/email-verify/${param.token}`;
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param])

  //delay loading components
  setTimeout(() => {
    setDelay(false)
  }, 3000);




  const Success = () => (
    <div data-aos="fade-up" data-aos-once="true" data-aos-delay="500" className="flex items-center min-h-screen p-6 bg-gray-50">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="flex flex-col justify-center items-center text-center"> <div className="mx-auto flex items-center justify-center md:w-[250px] w-[200px]" style={{ backgroundColor: '#f1f1f5', borderRadius: '50%' }}>
          <img src={successGif} alt="success" className="w-full h-auto sm:max-w-[200px] max-w-[150px] mx-auto" />
        </div>
          <div className="mt-2 px-7 py-3">
            <h3 className="sm:text-2xl text-xl text-[#252641] font-semibold">Successful!</h3>
            <p className="text-sm md:text-base text-gray-500">Account has been Successfully registered.</p>
          </div>
          <div className="mx-auto items-center px-4 py-3 w-3/5 md:w-1/4">
            <Button
              onClick={() => navigate('/login', { replace: true })}
              type="button"
              children="Log in"
              className="text-white my-1 relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 rounded-full bg-[#252641] transition duration-300 hover:scale-105 active:duration-75 active:scale-95"
            />

          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      {delay ?
        (<Preloader />)
        :
        (validUrl ? (
          <Success />
        ) : (
          <NotFound />
        ))}
    </div>
  )
}

export default RegistrationVerify;

