import React, { useState, useEffect, FC, useContext} from "react";
import { WiizzkidContext, WiizzkidContextType } from '../context/wiizzkid.context';




type CountdownPropTypes = {
    day: number,
    month: number,
    year: number
}


type timeLeftType = {
  days: number,
  hours: number,
  minutes: number,
  seconds: number
} 



const CountDown: FC<CountdownPropTypes> = ({day, month, year}) =>  {
  const { value } = useContext(WiizzkidContext) as WiizzkidContextType;
  const colors = ['#ff5d5d', '#e0b00d', '#37b9b2'];


  const calculateTimeLeft = () => {
    let difference = (+new Date(`${month}/${day}/${year}`)) - (+new Date());

    let timeLeft = {};

    if (difference > 0) {
    timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
    };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<timeLeftType | {}>(calculateTimeLeft());

    //timer 
    useEffect(() => {
        const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

  


  

    const timerComponents: React.ReactNode[] = [];

    Object.keys(timeLeft).forEach((interval: string) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
        return;
    }

    timerComponents.push(
         <div className="col-4" key={interval}>
         <div style={{color: `${colors[value]}`}} className={`text-base bg-gray-200 p-3 font-semibold border-x border-gray-300`}>
           <p id="m-0"> {timeLeft[interval as keyof typeof timeLeft]}</p>
           <span className="text-sm leading-none font-normal text-darken"> {interval}</span>
         </div>
       </div>
    );
    });
    
   
    return (
      <div className={`bg-gray-100 border-4 text-center flex w-full lg:w-[350px] p-3 md:p-5 items-center justify-center shadow-lg rounded-md my-6`} style={{borderColor: `${colors[value]}`}}>
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </div>
    );
  }


export default CountDown;
