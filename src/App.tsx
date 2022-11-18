import React,{useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login, Register, ForgotPassword, Dashboard, Roadmap, RegisterNotify } from "./pages";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast';


function App() {
  useEffect(() => {
    AOS.init();
  }, []);


  return (
   <div className="antialiased">
    <Toaster />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register"  element={<Register />}/>
      <Route path="/registration-notification" element={<RegisterNotify />} />
      <Route path="/password-recovery" element={<ForgotPassword />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/roadmap" element={<Roadmap />} />
    </Routes>
   </div>
  )
}

export default App
