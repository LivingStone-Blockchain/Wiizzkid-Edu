import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { FC } from 'react'

type timeProp = {
  duration: number,
  setStart:React.Dispatch<React.SetStateAction<boolean>>,
}


const Countdown:FC<timeProp> = ({duration, setStart}) => (
    //4 added accounts for toast loading duration
  <CountdownCircleTimer
    isPlaying
    duration={(duration * 60) + 4}
    colors={['#37b9b2', '#e0b00d', '#FF3939', '#FF3939']}
    colorsTime={[duration * 60, (duration * 60) / 2, (duration * 60) / 5, (duration * 0)]}
    size={80}
    strokeWidth={7}
    trailColor={'#d9d9d9'}
    onComplete={() => {
        setStart(false)
    }}
  >
    {({ remainingTime }) =>  {
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
  
    return `${minutes}:${seconds}`
  }}
    
  </CountdownCircleTimer>
)


export default Countdown;