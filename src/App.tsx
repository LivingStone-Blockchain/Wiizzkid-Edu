import React,{useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login, Register, ForgotPassword, Dashboard, RegisterNotification, Roadmap, RegistrationVerify, NotFound } from "./pages";
import QuizIndex from "./gameContainers/quiz/pages/QuizIndex";
import QuizPlay from "./gameContainers/quiz/pages/QuizPlay";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast';
import QuizApp from "./gameContainers/quiz/QuizApp";


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
      <Route path="/registration-notification" element={<RegisterNotification />} />
      <Route path="/password-recovery" element={<ForgotPassword />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/user/email-verified" element={<RegistrationVerify />} />
      {/*<Route path="/quiz-home" element={<QuizIndex />} />*/}
      <Route path="/quiz" element={<QuizPlay />} />
      <Route path="/quiz-home" element={<QuizApp />}/>
      <Route path="*" element={<NotFound />}/>
    </Routes>
   </div>
  )
}

export default App
