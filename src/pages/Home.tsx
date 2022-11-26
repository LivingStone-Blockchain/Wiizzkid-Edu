import React, { useEffect, useContext } from 'react';
import { UserContext, UserContextType } from '../context/user.context'
import Header from '../components/Header';
import Brand from '../components/Brand';
import Modes from '../components/Modes';
import About from '../components/About';
import Metaverse from '../components/Metaverse';
import Blog from '../components/Blog';
import BackToTop from '../components/BackToTop';
import Footer from '../components/Footer';
import loaderGif from './../assets/preloader/loader.gif';

const Home = () => {
  const { isLoading, setIsLoading } = useContext(UserContext) as UserContextType;

  //kill loader after 2sec
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
  }, 2000)
  }, [])

  

 
  return (
    <div>
       <div className={`flex justify-center items-center left-0 right-0 z-[100] h-full ${isLoading ? 'opacity-0 bg-none hidden' : 'fixed opacity-100 bg-white block'}`}>
        <img src={loaderGif} alt="loader" className="w-full h-auto mx-auto sm:max-w-[250px] max-w-[200px]"/>
    </div>
      <Header />
      <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700">
        <Brand />
        <Modes />
        <About />
      </div>
      <Metaverse />
      <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700 ">
        <Blog />
      </div>
      <BackToTop />
      <Footer />
    </div>
  )
}

export default Home;