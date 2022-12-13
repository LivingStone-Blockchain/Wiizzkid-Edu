import React, { useEffect, useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import {QuizContext, QuizContextType } from "../../context/quiz.context";
import QuizIndex from "./pages/QuizIndex";



function QuizApp() {
  const { showSplashScreen, setShowSplashScreen } = useContext(QuizContext) as QuizContextType;
  
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
    <React.Fragment>
      <Toaster />
      <Routes>
        <Route  path="/" element={<QuizIndex />}/> 
      </Routes>
    </React.Fragment>
  );
}

export default QuizApp;
