import React, { useEffect, useState, useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import { GameContext, GameContextType } from "../../context/game.context";
import Homepage from "./pages/Homepage";
import QuizPlay from "./pages/QuizPlay";
import QuizIndex from "./pages/QuizIndex";
import TimesTableIndex from "./pages/TimesTableIndex";


function App() {
  const { showSplashScreen, setShowSplashScreen } = useContext(GameContext) as GameContextType;
 

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
        {/*<Route path="/" element={<Homepage />} />
        <Route path="/timestable" element={<TimesTableIndex />} />*/}
        <Route path="/quiz" element={<QuizPlay />} />
        <Route  path="/" element={<QuizIndex />}/>
       
      </Routes>
    </React.Fragment>
  );
}

export default App;
