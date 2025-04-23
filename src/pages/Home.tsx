import {
  Brand,
  Features,
  Modes,
  Metaverse,
  Blog,
  GameModes,
  BuyInstruction,
  Help,
  FAQ,
} from "../components/index";
import ChatBot from './ChatBot';
// import {
//   WiizzkidContext,
//   WiizzkidContextType,
// } from "../context/wiizzkid.context";
// import { ComingSoon } from "../components/index";

const Home = () => {
  // const { openPresale, setOpenPresale } = useContext(
  //   WiizzkidContext
  // ) as WiizzkidContextType;
  return (
    <>
      <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700">
        {/* <ComingSoon openPresale={openPresale} setOpenPresale={setOpenPresale} /> */}
        <Brand />
        <Features />
        <GameModes />
        <BuyInstruction />
      </div>
      <Help />
      <ChatBot />
      <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700">
        <Modes />
      </div>
      <Metaverse />
      <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700 ">
        <Blog />
        <FAQ />
      </div>
    </>
  );
};

export default Home;
