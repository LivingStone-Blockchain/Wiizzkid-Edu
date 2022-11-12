import React,{useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login, Register, ForgotPassword } from "./pages";
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
      <Route path="/register"  element={<Register />}/>
      <Route path="/password-recovery" element={<ForgotPassword />}/>
    </Routes>
   </div>
  )
}

export default App
