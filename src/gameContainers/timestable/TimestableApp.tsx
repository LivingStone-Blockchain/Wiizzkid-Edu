import React, { useEffect, useContext } from 'react';
import { Route, Routes } from "react-router-dom";
import { TimestableIndex } from './pages/index';
import { Toaster } from 'react-hot-toast';
import Overlay from "./components/Overlay";
import { TimestableContext, TimestableContextType } from '../../context/timestable.context';
import SplashScreen from "./components/SplashScreen";



function App() {
    const { loading, showSplashScreen, setShowSplashScreen } = useContext(TimestableContext) as TimestableContextType;

    //set Video
    useEffect(() => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
       });

    setTimeout(() => {
      setShowSplashScreen(false);
    }, 7000);
  }, []);


  if (showSplashScreen) {
    return (
      <SplashScreen
        showSplashScreen={showSplashScreen}
        setShowSplashScreen={setShowSplashScreen}
      />
    );
  }
  

  return (
    <>
         <Toaster />
         <Overlay loading={loading} />
        <Routes>
            <Route path='/' element={<TimestableIndex />}/>
        </Routes>
    </>
  )
}

export default App;