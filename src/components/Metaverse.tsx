import CountDown from "./Countdown";
import {
  vrStudent,
  vrStudentPlaceholder,
  maths,
  choose,
  geo,
  abacus,
  signs,
} from "../assets/metaverse";
import Button from "./Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Metaverse = () => {
  return (
    <div
      id="metaverse"
      className="md:flex mt-24 py-16 px-4 md:px-8 md:space-x-10 items-start bg-navy"
    >
      <div
        data-aos="fade-down"
        className="md:w-7/12 relative lg:self-start self-center"
      >
        <div className="bg-tealLight w-32 h-32 rounded-full absolute z-0 left-4 -top-12 animate-pulse"></div>
        <div className="bg-golden w-5 h-5 rounded-full absolute z-0 left-36 -top-12 animate-ping"></div>
        <LazyLoadImage
          src={vrStudent}
          placeholderSrc={vrStudentPlaceholder}
          effect="opacity"
          alt="boy on VR"
          className="relative z-50 w-full h-auto lg:max-w-[450px]"
        />
        <div className="bg-pop w-36 h-36 rounded-full absolute z-0 right-16 -bottom-1 animate-pulse hidden md:block"></div>
        <div className="bg-tomato w-5 h-5 rounded-full absolute z-0 right-52 bottom-1 animate-ping"></div>

        <div className="absolute top-20 left-[270px] sm:top-32 sm:left-[450px] md:top-16 md:left-[250px] lg:left-[330px] lg:top-24 floating-4">
          <img
            src={maths}
            alt="maths"
            className="w-full h-auto lg:max-w-[45px] md:max-w-[35px] sm: sm:max-w-[60px] max-w-[40px]"
            width="60"
            height="60"
          />
        </div>

        <div className="absolute top-0 left-[340px] sm:top-6 sm:left-[550px] md:-top-8 md:left-[290px] lg:left-[400px] lg:top-2 floating">
          <img
            src={geo}
            alt="maths"
            className="w-full h-auto lg:max-w-[40px] md:max-w-[30px] sm: sm:max-w-[55px] max-w-[35px]"
            width="60"
            height="60"
          />
        </div>

        <div className="absolute top-4 left-56 sm:top-6 sm:left-[370px] md:-top-2 md:left-[200px] lg:left-[300px] lg:top-6 floating-4">
          <img
            src={signs}
            alt="maths"
            className="w-full h-auto lg:max-w-[40px] md:max-w-[30px] sm: sm:max-w-[55px] max-w-[35px]"
            width="60"
            height="60"
          />
        </div>

        <div className="absolute top-36 left-80 sm:top-56 sm:left-[530px] md:top-32 md:left-[300px] lg:left-[450px] lg:top-32 floating">
          <img
            src={abacus}
            alt="maths"
            className="w-full h-auto lg:max-w-[40px] md:max-w-[30px] sm: sm:max-w-[55px] max-w-[35px]"
            width="60"
            height="60"
          />
        </div>

        {
          <div className="hidden absolute top-36 left-[244px] sm:top-56 sm:left-[530px] md:top-32 md:left-[300px] lg:left-[300px] lg:top-56 floating">
            <img
              src={choose}
              alt="maths"
              className="w-full h-auto lg:max-w-[45px] md:max-w-[35px] sm: sm:max-w-[60px] max-w-[40px]"
              width="60"
              height="60"
            />
          </div>
        }
      </div>
      <div
        data-aos="fade-down"
        className="flex flex-col items-start md:w-1/2 mt-20 md:mt-0 text-gray-500 relative"
      >
        <h1 className="md:text-2xl text-xl font-semibold text-white lg:pr-30">
          Wiizzkid Metaverse <span className="text-tomato">coming soon</span>
        </h1>
        <div className="bg-tealLight w-6 h-6 rounded-full absolute z-0 lg:right-36 right-4 -top-8 lg:-top-8 animate-pulse"></div>
        <div className="bg-pop w-16 h-16 rounded-full absolute z-0 lg:right-36 right-4 -top-8 lg:-top-8 opacity-30"></div>
        <p className="space-x-5 my-5 text-white md:text-base text-sm">
          We are preparing something exciting and amazing for you.
        </p>
        <CountDown
          day={8}
          month={6}
          year={2025}
          colors={["#ff5d5d", "#e0b00d", "#37b9b2"]}
        />
        <div className="pt-8 w-full">
          <p className="space-x-5 my-5 text-white md:text-base text-sm z-1">
            Want to be the first to know when we launch ?
          </p>
          <div className="flex flex-row space-x-3 justify-start mt-3 w-full">
            <input
              type="email"
              placeholder="Your Email"
              className="flex-initial md:w-72 w-64 first-letter:rounded-full py-3 placeholder:text-sm text-sm pl-5 bg-transparent border-2 border-white rounded-full"
            />
            <Button
              children="Subscribe"
              type="submit"
              className="flex-initial md:w-36 w-28 text-white mx-auto sm:mx-0 font-semibold px-5 py-3  bg-[#252641] shadow-btn-darken "
              style={{
                background:
                  "linear-gradient(105.5deg, #545AE7 19.57%, #393FCF 78.85%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metaverse;
