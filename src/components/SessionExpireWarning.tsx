import React, {FC} from 'react'
import warning from './../assets/general/warning.png';
import Button from './Button';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


type SessionExpireType = {
    setRefreshTokenError: (value: React.SetStateAction<boolean>) => void
}

const SessionExpireWarning: FC<SessionExpireType> = ({setRefreshTokenError}) => {
    const navigate = useNavigate();
  
    return (
      <>
         <section className="w-full py-4">
            <img src={warning} className="w-14 mx-auto" alt="caution" />

            <div className="flex flex-col items-center justify-center gap-1 text-center mt-4">
            <p className="text-navy space-x-5 md:text-lg text-base font-semibold leading-relaxed">
                Your session has expired!
            </p>
            <p className=" text-navy space-x-5 text-sm leading-relaxed">
                Please log in again to continue using the app
            </p>
            </div>
            <Button 
                children="Log in"
                className='flex justify-center items-center gap-2 w-full md:text-base text-sm bg-navy mx-auto font-semibold px-5 py-3 mt-4 text-white transition text-center'
                onClick={() => {toast.dismiss(); navigate('/login'); setRefreshTokenError(false)}}
            />
        </section>
      </>
  )
}

export default SessionExpireWarning;