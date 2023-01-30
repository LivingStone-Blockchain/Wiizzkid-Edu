import React,{useEffect, useContext} from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login, Register, ForgotPassword, Dashboard, About, RegisterNotification, Roadmap, RegistrationVerify, NotFound, Pricing, BlogDetails, ResetPassword } from "./pages";
import { Header, Footer, BackToTop, Preloader, UserRoute } from './components/index'
import { DashboardHome, BuyStone, Quizzes, QuizHistory, WiizzkidMetaverse } from "./components/dashboard/pages/index";
import QuizPlay from "./gameContainers/quiz/pages/QuizPlay";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast';
import {Overlay} from "./components/index";
import QuizApp from "./gameContainers/quiz/QuizApp";
import TimestablePlay from "./gameContainers/timestable/pages/TimestablePlay";
import { WiizzkidContext, WiizzkidContextType } from './context/wiizzkid.context';
import { UserContext, UserContextType } from './context/user.context';
import TimestableApp  from './gameContainers/timestable/TimestableApp';
import ModalVideo from 'react-modal-video';
import { wiizzkidVideo } from './assets/header/index';
import './../node_modules/react-modal-video/css/modal-video.css';


function App() {
  const { openVideo, setOpenVideo } = useContext(WiizzkidContext) as WiizzkidContextType;
  const { refreshTokenError } = useContext(UserContext) as UserContextType; 
  useEffect(() => {
    AOS.init();
  }, []);




  return (
   <div className="antialiased">
    <Toaster />
    <Preloader  homeLoader={true} />
    <Overlay loading={refreshTokenError}/>
   <Header />
   <ModalVideo channel='custom' isOpen={openVideo} url={wiizzkidVideo} onClose={() => setOpenVideo(false)} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register"  element={<Register />}/>
      <Route path="/registration-notification" element={<RegisterNotification />} />
      <Route path="/password-recovery" element={<ForgotPassword />}/>
      <Route element={<UserRoute children={<Dashboard />} />}>
        <Route path='/dashboard-home' element={<DashboardHome />} />
        <Route path="/dashboard/buy-token" element={<BuyStone />} />
        <Route path="/dashboard/quizzes" element={<Quizzes />} />
        <Route path="/dashboard/quiz-history" element={<QuizHistory />} />
        <Route path="/dashboard/wiizzkid-metaverse" element={<WiizzkidMetaverse />} />
      </Route>
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<About />}/>
      <Route path="/blogs/:id" element={<BlogDetails />}/>
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/user/email-verify/:token" element={<RegistrationVerify />} />
      <Route path="/user/password-reset/:uidb64/:token" element={<ResetPassword />} />
      {/*Different routes to same page */}
      <Route path="/quiz" element={<QuizPlay />} /> 
      <Route path="/quiz?code=:joinGameCode" element={<QuizPlay />} /> 
      <Route path="/quiz-home/*" element={<QuizApp />}/>

      <Route path="/timestable" element={<TimestablePlay />} />
      <Route path="/timestable?code=:joinGameCode" element={<TimestablePlay />} /> 
      <Route path="/timestable-home/*" element={<TimestableApp />}/>
      <Route path="*" element={<NotFound />}/>
    </Routes>
    <Footer />
    <BackToTop />
   </div>
  )
}

export default App
