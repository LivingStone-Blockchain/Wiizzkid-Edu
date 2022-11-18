import React from 'react'
import loaderGif from './../assets/preloader/loader.gif';

const Preloader = () => {
  return (
    <div className="flex justify-center items-center" style={{height: "100vh"}}>
        <img src={loaderGif} alt="loader" className="w-full h-auto sm:max-w-[250px] max-w-[200px]"/>
    </div>
  )
}

export default Preloader;