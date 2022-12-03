import React,{useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login, Register, ForgotPassword, Dashboard, About, RegisterNotification, Roadmap, RegistrationVerify, NotFound, Pricing, BlogDetails } from "./pages";
import { Header, Footer, BackToTop, Preloader, UserRoute } from './components/index'
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
    <Preloader  homeLoader={true} />
   <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register"  element={<Register />}/>
      <Route path="/registration-notification" element={<RegisterNotification />} />
      <Route path="/password-recovery" element={<ForgotPassword />}/>
      <Route path="/dashboard" element={<UserRoute children={<Dashboard />}/>}/>
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<About />}/>
      <Route path="/blogs/:id" element={<BlogDetails />}/>
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/user/email-verify/:token" element={<RegistrationVerify />} />
      <Route path="/quiz" element={<QuizPlay />} />
      <Route path="/quiz-home/*" element={<QuizApp />}/>
      <Route path="*" element={<NotFound />}/>
    </Routes>
    <Footer />
    <BackToTop />
   </div>
  )
}

export default App
