import React from 'react'
import Header from '../components/Header';
import Hero from '../components/Hero';

const Homepage = () => {
  return (
    <div className="bg-gradient-to-r from-orange-600 via-red-500 to-yellow-600 opacity-95">
     <Header />
     <Hero />
    </div>
  )
}

export default Homepage;