import React, { useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";
//react modal styling
import "./../node_modules/react-modal-video/css/modal-video.css";
import {
  Home,
  Login,
  Register,
  ForgotPassword,
  Dashboard,
  About,
  RegisterNotification,
  Roadmap,
  RegistrationVerify,
  NotFound,
  Pricing,
  BlogDetails,
  ResetPassword,
} from "./pages";
import {
  Header,
  Footer,
  BackToTop,
  Preloader,
  UserRoute,
} from "./components/index";
import {
  DashboardHome,
  BuyStone,
  Quizzes,
  QuizHistory,
  WiizzkidMetaverse,
  Exchange,
} from "./components/dashboard/pages/index";
import QuizPlay from "./gameContainers/quiz/pages/QuizPlay";
import StripeCompletion from "./components/dashboard/components/stripe/StripeCompletion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Toaster } from "react-hot-toast";
import { Overlay } from "./components/index";
import QuizApp from "./gameContainers/quiz/QuizApp";
import TimestablePlay from "./gameContainers/timestable/pages/TimestablePlay";
import {
  WiizzkidContext,
  WiizzkidContextType,
} from "./context/wiizzkid.context";
import { UserContext, UserContextType } from "./context/user.context";
import TimestableApp from "./gameContainers/timestable/TimestableApp";
import ModalVideo from "react-modal-video";
import { wiizzkidVideo } from "./assets/header/index";
import ARFeaturePage from "./pages/ARFeaturePage"
// import ChatBotPage from "./pages/ChatBotPage";

function App() {

  const VideoModal = ModalVideo as unknown as React.ComponentType<any>;

  const { openVideo, setOpenVideo } = useContext(
    WiizzkidContext
  ) as WiizzkidContextType;
  const { refreshTokenError } = useContext(UserContext) as UserContextType;
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="antialiased">
      <Toaster />
      <Preloader homeLoader={true} />
      <Overlay loading={refreshTokenError} />
      <Header />
      <VideoModal
        channel="custom"
        isOpen={openVideo}
        url={wiizzkidVideo}
        onClose={() => setOpenVideo(false)}
      />
      <Routes>
        <Route path="/Wiizzkid-Edu" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/registration-notification"
          element={<RegisterNotification />}
        />
        <Route path="/password-recovery" element={<ForgotPassword />} />
        <Route element={<UserRoute children={<Dashboard />} />}>
          <Route path="/dashboard-home" element={<DashboardHome />} />
          <Route path="/dashboard/buy-token" element={<BuyStone />} />
          <Route path="/dashboard/exchange" element={<Exchange />} />
          <Route path="/dashboard/quizzes" element={<Quizzes />} />
          <Route path="/dashboard/quiz-history" element={<QuizHistory />} />
          <Route
            path="/dashboard/wiizzkid-metaverse"
            element={<WiizzkidMetaverse />}
          />
        </Route>
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/ar-feature" element={<ARFeaturePage />} />
        {/* <Route path="/bot" element={<ChatBotPage />} /> */}

        <Route
          path="/dashboard/buy-token/completion"
          element={<StripeCompletion />}
        />
        <Route
          path="/user/email-verify/:token"
          element={<RegistrationVerify />}
        />
        <Route
          path="/user/password-reset/:uidb64/:token"
          element={<ResetPassword />}
        />
        {/*Different routes to same page */}
        <Route path="/quiz" element={<QuizPlay />} />
        <Route path="/quiz?code=:joinGameCode" element={<QuizPlay />} />
        <Route path="/quiz-home/*" element={<QuizApp />} />

        <Route path="/timestable" element={<TimestablePlay />} />
        <Route
          path="/timestable?code=:joinGameCode"
          element={<TimestablePlay />}
        />
        <Route path="/timestable-home/*" element={<TimestableApp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
