import React,{useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login } from "./pages";
import AOS from 'aos';
import 'aos/dist/aos.css';


function App() {
  useEffect(() => {
    AOS.init();
  }, []);


  return (
   <div className="antialiased">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
   </div>
  )
}

export default App
