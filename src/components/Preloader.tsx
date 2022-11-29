import React, { useState, useEffect, FC } from 'react'
import loaderGif from './../assets/preloader/loader.gif';


type PreloaderProp = {
  homeLoader?: boolean
}

const Preloader: FC<PreloaderProp> = ({homeLoader}) => {
  const[isLoading, setIsLoading] = useState<boolean>(false);

  //kill loader after 2sec
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
  }, 3000)
  }, [])


  if (homeLoader) {
    return (
      <div className={`flex justify-center items-center left-0 right-0 z-[100] h-full ${isLoading ? 'opacity-0 bg-none hidden' : 'fixed opacity-100 bg-white block'}`}>
      <img src={loaderGif} alt="loader" className="w-full h-auto mx-auto sm:max-w-[250px] max-w-[200px]"/>
    </div>
    )
  }

  return (
    <div className="flex justify-center items-center" style={{height: "100vh"}}>
        <img src={loaderGif} alt="loader" className="w-full h-auto sm:max-w-[250px] max-w-[200px]"/>
    </div>
  )
}

export default Preloader;