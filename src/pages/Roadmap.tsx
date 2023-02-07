import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import DrawSvg from "./../components/roadmap/DrawSvg";
import { Banner, Button } from "../components";
import { Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sept, Oct, Nov, Dec, Year2022, Year2023 } from "../assets/roadmap/index";



type RoadMapDataType = {
  img: string,
  text: string
}[]


const roadMapData1: RoadMapDataType  = [
  {
    img: Jan,
    text: "Birth of Concept",
  },
  {
    img: Feb,
    text: "Team Development",
  },
  {
    img: Mar,
    text: "Choosing Blockchain Technology",
  },
  {
    img: Apr,
    text: "Website Creation",
  },
  {
    img: May,
    text: "Hosting Website",
  },
  {
    img: Jun,
    text: "Finalizing Website"
  },
  {
    img: Jul,
    text: "Social Media Marketing"
  },
  {
    img: Aug,
    text: "User Wallet Creation"
  },
  {
    img: Sept,
    text: "Shanghai Mode Launch"
  },
  {
    img: Oct,
    text: "NFT Test Mode"
  },
  {
    img: Nov,
    text: "NFT First Generation"
  },
  {
    img: Dec,
    text: "Year End Battle"
  }
]



const roadMapData2: RoadMapDataType  = [
  {
    img: Jan,
    text: "Marketing",
  },
  {
    img: Feb,
    text: "Liquidity Pool Authentication",
  },
  {
    img: Mar,
    text: "Shanghai Mode Battle",
  },
  {
    img: Apr,
    text: "Launching Beijing Mode",
  },
  {
    img: May,
    text: "Quiz Result Day"
  },
  {
    img: Jun,
    text: "Quiz Competition"
  },
  {
    img: Jul,
    text: "2nd NFT Creation"
  },
  {
    img: Aug,
    text: "Private Token Sale",
  },
  {
    img: Sept,
    text: "Curriculum Development"
  },
  {
    img: Oct,
    text: "Math Curriculum Dev"
  },
  {
    img: Nov,
    text: "English Curriculum Dev"
  },
  {
    img: Dec,
    text: "Investment Opportunities"
  }
]





const Roadmap = () => {
  const [observer, setObserver] = useState<boolean>(false);
  const revealRefs = useRef<HTMLDivElement[]>([]);
  revealRefs.current = [];
  gsap.registerPlugin(ScrollTrigger);


  //switch roadmap view
  useEffect(() => {
        //window.scrollTo(0, 0);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
  }, [observer]);




  const addToRefs = (el: any) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };



  useLayoutEffect(() => {
    let t1 = gsap.timeline();
    revealRefs.current.forEach((el, index) => {
      t1.fromTo(
        el.childNodes[0],
        { y: "0" },
        {
          y: "-30%",
          scrollTrigger: {
            id: `section-${index + 1}`,
            trigger: el,
            start: "top center+=200px",
            end: "bottom center",
            scrub: true,
          },
        }
      );
    });
    return () => {};
  }, []);


  return (
   <>
    <Banner title="Roadmap"/>
     <section className="min-h-screen w-screen relative  bg-slate-50">
     
     <div  className={`w-full h-full flex justify-center items-center my-10`}>
            <div className={`lg:w-2/5 w-[80%]  h-fit p-4 border-[3px] border-navy border-solid rounded-tr-[50px] rounded-bl-[50px]`}>
              <p className={`flex items-center justify-center h-fit bg-tealLighter text-navy p-4 relative border border-navy border-solid rounded-tr-[40px] rounded-bl-[40px]`}>
                <span className='block text-sm md:text-base text-navy font-normal first-letter:text-4xl md:first-letter:text-6xl first-letter:font-bold first-letter:text-navy first-letter:mr-3 first-letter:float-left'>Wiizzkid's Roadmap is dynamic, regular upgrades and additions will occur in tandem with the expansion of our project. The release dates shown in the following roadmap are presently the most precise estimates available, although they could all change based on how work progresses.</span>
              </p>
            </div>
      </div>
      
      <div className="w-full relative top-6 flex md:justify-center justify-start items-center p-5">
        <p className='block text-3xl md:text-4xl capitalize text-navy font-bold'>
          <span className="inline-block" style={{transform: "translate(2px, 10px) rotate(-10deg)"}}>2</span>
          <span className="inline-block" style={{transform: "transform: translate(1px, 8px) rotate(-5deg)"}}>0</span>
          <span className="inline-block" style={{transform: "transform: translate(-1px, 8px) rotate(5deg)"}}>2</span>
          <span className="inline-block" style={{transform: "translate(-2px, 10px) rotate(10deg)"}}>{!observer ? '2' : '3'}</span>
        </p>
      </div>
      {!observer ? (
        <div className={`lg:w-[70%] md:w-[80%] w-[90%] h-fit mx-auto my-0 flex justify-center items-center relative`}>
        <div className="flex justify-center items-center"> 
          <DrawSvg />
        </div>
        <ul className="list-none md:w-full w-[90%] h-full flex flex-col md:gap-0 gap-4  items-center justify-center md:py-24 py-12">
          <li className="w-full h-full flex md:justify-center justify-end">&nbsp;</li>
          {roadMapData1.map(({img, text}, index) => (
            <li key={index}  data-aos="fade-up" data-aos-delay="200" className={`w-full h-full flex justifying ${index % 2 === 0 ? 'md:justify-end justify-center' : 'md:justify-start justify-center'}`} ref={addToRefs}>
            <div className={`md:w-2/5 w-[70%]  h-fit p-4 border-[3px] border-navy border-solid ${index % 2 === 0 ? "md:text-left rounded-tr-[50px] rounded-bl-[50px]" : "md:text-right text-left md:rounded-tl-[50px] md:rounded-br-[50px] md:rounded-tr-[0px] md:rounded-bl-[0px] rounded-tr-[50px] rounded-bl-[50px]"}`}>
              <p className={`flex items-center justify-center gap-5 h-fit bg-tealLighter text-navy p-4 relative border border-navy border-solid ${index % 2 === 0 ? "rounded-tr-[40px] rounded-bl-[40px]" : "md:rounded-tl-[40px] md:rounded-br-[40px] md:rounded-tr-[0px] md:rounded-bl-[0px] rounded-tr-[40px] rounded-bl-[40px]"}`}>
                <img src={img} alt={text} className={`w-full h-auto max-w-[50px]`}/>
                <span className='block text-sm md:text-base capitalize text-navy font-semibold'>{text}</span>
              </p>
            </div>
          </li>
          ))}
        </ul>
      </div>
      ):(
        <div className={`lg:w-[70%] md:w-[80%] w-[90%] h-fit mx-auto my-0 flex justify-center items-center relative`}>
        <div className="flex justify-center items-center"> 
          <DrawSvg />
        </div>
        <ul className="list-none md:w-full w-[90%] h-full flex flex-col md:gap-0 gap-4  items-center justify-center md:py-24 py-12">
          <li className="w-full h-full flex md:justify-center justify-end">&nbsp;</li>
          {roadMapData2.map(({img, text}, index) => (
            <li key={index}  data-aos="fade-up" data-aos-delay="200" className={`w-full h-full flex justifying ${index % 2 === 0 ? 'md:justify-end justify-center' : 'md:justify-start justify-center'}`} ref={addToRefs}>
            <div className={`md:w-2/5 w-[70%]  h-fit p-4 border-[3px] border-navy border-solid ${index % 2 === 0 ? "md:text-left rounded-tr-[50px] rounded-bl-[50px]" : "md:text-right text-left md:rounded-tl-[50px] md:rounded-br-[50px] md:rounded-tr-[0px] md:rounded-bl-[0px] rounded-tr-[50px] rounded-bl-[50px]"}`}>
              <p className={`flex items-center justify-center gap-5 h-fit bg-tealLighter text-navy p-4 relative border border-navy border-solid ${index % 2 === 0 ? "rounded-tr-[40px] rounded-bl-[40px]" : "md:rounded-tl-[40px] md:rounded-br-[40px] md:rounded-tr-[0px] md:rounded-bl-[0px] rounded-tr-[40px] rounded-bl-[40px]"}`}>
                <img src={img} alt={text} className={`w-full h-auto md:max-w-[50px] max-w-[40px]`}/>
                <span className='block text-sm md:text-base capitalize text-navy font-semibold'>{text}</span>
              </p>
            </div>
          </li>
          ))}
        </ul>
      </div>
      )}
  </section>
  <div className="w-full flex justify-center items-center mt-16">
        <Button 
          children={`${!observer ? 'See 2023' : 'Back to 2022'}`} 
          onClick={() => setObserver(!observer)}
          className="flex-initial md:w-48 w-36 text-white mx-auto sm:mx-0 text-sm font-semibold px-5 py-3 bg-navy"
        />
  </div>
   </>
  )
}

export default Roadmap;
