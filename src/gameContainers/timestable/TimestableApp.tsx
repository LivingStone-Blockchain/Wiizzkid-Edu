import React, { useEffect, useContext } from 'react';
import { Route, Routes } from "react-router-dom";
import { TimestableIndex } from './pages/index';
import AOS from 'aos';
import { Toaster } from 'react-hot-toast';
import Overlay from "./components/Overlay";
import { TimestableContext, TimestableContextType } from '../../context/timestable.context';


function App() {
    const { loading } = useContext(TimestableContext) as TimestableContextType;

    useEffect(() => {
      AOS.init();
    }, []);
  

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