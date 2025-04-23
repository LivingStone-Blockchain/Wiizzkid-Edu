import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { GraduationCap, Image, Ticket } from 'lucide-react';
import { vr } from "../assets/header/index";


type FeatureData = {
  id: number
  title: string
  subtitleShort: string
  subtitleLong: string
  colorDeep: string
  colorLight: string
  icon: React.ReactNode
}


const featuresData: FeatureData[] = [
  {
    id: 1,
    title: "Hybrid Education",
    subtitleShort: "Wiizzkid offers flexible and convenient learning for all. Learn anytime, anywhere, on any device.",
    subtitleLong: "Learn from anywhere, at any time, and on any device. Whether you're a student looking to enhance your knowledge and skills, or an educator seeking to reach more students and provide a personalized learning experience, Wiizzkid has something to offer.",
    colorDeep: '#FF3939',
    colorLight: '#ffedef',
    icon: <GraduationCap className="w-6 h-6 m-auto text-tomato"/>
  },
  {
    id: 2,
    title: "Learn to Earn",
    subtitleShort: "Wiizzkid rewards learning with tokens for benefits like discounts, exclusive content, and prizes.",
    subtitleLong: "Learn from anywhere, at any time, and on any device. Whether you're a student looking to enhance your knowledge and skills, or an educator seeking to reach more students and provide a personalized learning experience, Wiizzkid has something to offer",
    colorDeep: '#e0b00d',
    colorLight: '#fff2e1',
    icon: <Ticket className="w-6 h-6 m-auto text-golden"/>
  },
  {
    id: 3,
    title: "NFT Special",
    subtitleShort: "Own a topic-related NFT to gain exclusive insights for comprehensive learning before quiz.",
    subtitleLong: "By owning an NFT related to a specific topic, students can gain access to exclusive content and insights that can help them learn more about the topic before taking the quiz, ensuring a more comprehensive and effective learning experience.",
    colorDeep: '#26a8a1',
    colorLight: '#e5fbfa',
    icon: <Image className="w-6 h-6 m-auto text-teal"/>
  },
  {
    id: 4,
    title: "AR-powered Metaverse",
    subtitleShort: "Wiizzkid's metaverse world offers interactive and fun learning through AR technology.",
    subtitleLong: "Wiizzkid is developing an AR-powered education world on the metaverse, which will allow students to explore and interact with educational content in a fun and engaging way.",
    colorDeep: '#252641',
    colorLight: '#F9FAFB',
    icon: <img className='bg-navy bg-opacity-80 rounded-lg h-auto w-full max-w-[27px] p-1' src={vr} alt="vr" style={{ transform: "scaleX(-1)" }} width="30" height="30" /> 
  },
]


const Features = () => {
  const  [active, setActive] = useState<number>(0);
  const [activeHover, setActiveHover] = useState<number>(0);


  const handleClick = (id: number) => {
    setActive(id)
  }

  const handleHover = (id: number) => {
    setActiveHover(id)
  }




  return (

  <div className="m-auto text-gray-500 mt-24">
     <div data-aos="flip-up" className="text-center max-w-screen-lg mx-auto">
			<h1 className="md:text-3xl text-2xl font-bold mb-4 text-navy">Who are <span className="text-tomato">The Wiizzkids?</span></h1>
			<p className="text-gray-500 md:text-base text-sm leading-relaxed">Wiizzkid is a comprehensive learning platform that combines cutting-edge blockchain technologies with innovative features to provide a unique and engaging educational experience for students and educators alike.</p>
		</div>
    <div
      className={`mt-16 grid divide-x divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-200 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4 transition-all duration-500 ease-in-out ${active === 0 ? 'xl:h-[370px] lg:h-[420px]' : 'xl:h-[500px] lg:h-[600px]'}`}>
      {featuresData.map(({id, title, subtitleShort, subtitleLong, colorDeep, colorLight, icon}) => (
          <div key={id} className="group relative transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10" onMouseEnter={() => handleHover(id)} onMouseLeave={() => setActiveHover(0)} style={{backgroundColor: activeHover === id ? '#fff' : `${colorLight}`}}>
          <div className={`relative space-y-8 py-12 p-8 transition-all duration-500 ease-in-out ${active === id ? 'lg:h-auto md:h-[450px] h-[400px]' : 'lg:h-auto md:h-[350px] h-[340px]'}`}>
            <div className={`w-16 h-16 flex items-center justify-center gap-4 rounded-full`} style={{backgroundColor: activeHover === id ? `${colorLight}` : '#fff'}}>  
              {icon}
            </div>
  
            {active === id ? (
             <div className="space-y-2">
             <h2
               className="font-medium transition group-hover:text-primary md:text-xl text-lg text-navy"
             >
               {title}
             </h2>
             <p className={`text-gray-500 md:text-base text-sm leading-relaxed transition-all duration-700 ease-in-out ${active === id ? 'lg:opacity-100' : 'lg:opacity-0'}`}>
               {subtitleLong}
             </p>
           </div>
            ) : (
              <div className="space-y-2">
                <h2
                  className="font-medium transition group-hover:text-primary md:text-xl text-lg text-navy"
                >
                  {title}
                </h2>
                <p className="text-gray-500 md:text-base text-sm leading-relaxed">
                  {subtitleShort}
                </p>
            </div>
            )}
  
            <div onClick={() => {active === id ? setActive(0): handleClick(id)}} className="flex items-center justify-between cursor-pointer group-hover:text-text-navy  transition-all duration-300 ease-in-out">
              <span className={`sm:text-sm text-xs transition-all duration-300 ease-in-out ${active === id && 'underline'}`} style={{color: active === id ? '#252641' :`${colorDeep}`}}>{active === id ? 'close' : 'Read more'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${active === id && 'hidden'}`}>
                <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>                
            </div>
  
          </div>
        </div>
      ))}
    </div>
  </div>

  )
}

export default Features;