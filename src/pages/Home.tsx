import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Brand from '../components/Brand';
import Modes from '../components/Modes';
import About from '../components/About';
import Metaverse from '../components/Metaverse';
import Blog from '../components/Blog';
import Footer from '../components/Footer';


const Home = () => {
  return (
    <div>
        <Header />
        <Hero />
        <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700 ">
            <Brand />
            <Modes />
            <About />
        </div>
        <Metaverse />
        <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700 ">
          <Blog />
        </div>
        <Footer />
    </div>
  )
}

export default Home