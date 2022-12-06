import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ResetPasswordRequest from './ResetPasswordRequest';
import NotFound from './../NotFound';
import Preloader from '../../components/Preloader';



type AuthUserType = {
    success: string,
    message: string,
    token: string,
    uidb64: string,
}

const ResetPassword = () => {
    const [validUrl, setValidUrl] = useState<boolean>(false);
    const [delay, setDelay] = useState<boolean>(true);
    const [authUser, setAuthUser] = useState<AuthUserType>();
    const param = useParams();



    useEffect(() => {
        const verifyEmailUrl = async () => {
          const baseUrl = import.meta.env.VITE_HOST_BASE_URL;
    
          try {
            const url = `${baseUrl}/user/password-reset/${param.uidb64}/${param.token}/`;
            await axios.get(url).then((res) => setAuthUser(res.data));
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




  return (
    <>
         {delay ? (
        <Preloader load={validUrl}/>
      ) : (
        validUrl ? (
          <ResetPasswordRequest data={authUser!}/>
        ) : (
          <NotFound />
        )
      )}
    </>
  )
}

export default ResetPassword;