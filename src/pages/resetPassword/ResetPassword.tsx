import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
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

type validUrlType = {
  urlCheck: 'loading' | 'done' | 'error' 
}

const ResetPassword = () => {
  const [validUrl, setValidUrl] = useState<validUrlType>({urlCheck: 'loading'});
    const [authUser, setAuthUser] = useState<AuthUserType>();
    const param = useParams();



    useEffect(() => {
        const verifyEmailUrl = async () => {
          const baseUrl = import.meta.env.VITE_HOST_BASE_URL;
    
          try {
            const url = `${baseUrl}/user/password-reset/${param.uidb64}/${param.token}/`;
            await axios.get(url).then((res) => setAuthUser(res.data));
            setValidUrl({urlCheck: 'done'});
          } catch (error) {
            setValidUrl({urlCheck: 'error'});
          }
        };
        verifyEmailUrl();
      }, [param])




  return (
    <>
      {validUrl.urlCheck === "loading" && (<Preloader homeLoader={true} />)}
      {validUrl.urlCheck === "done" && ( <ResetPasswordRequest data={authUser!}/>)}
      {validUrl.urlCheck === "error" && (<NotFound />)}
    </>
  )
}

export default ResetPassword;