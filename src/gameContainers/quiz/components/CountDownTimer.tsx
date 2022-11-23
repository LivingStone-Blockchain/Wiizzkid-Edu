import { FC, useContext } from "react";
import Countdown from "react-countdown";
import { GameContext, GameContextType } from "../../../context/game.context";


interface CountDownTimerTypes {
  date: any;
  handleSubmit: Function;
}

interface RendererTypes {
  hours: any;
  minutes: any;
  seconds: number;
  completed: boolean;
}

const CountDownTimer: FC<CountDownTimerTypes> = ({ date, handleSubmit }) => {
  const { submitTimeRef } = useContext(GameContext) as GameContextType;

  const renderer = ({ hours, minutes, seconds, completed }: RendererTypes) => {
    return (
      <span ref={submitTimeRef}>
        {minutes}:{seconds} mins left...
      </span>
    );
  };

  return (
    <Countdown
      date={date}
      onComplete={() => handleSubmit()}
      renderer={renderer}
    />
  );
};

export default CountDownTimer;
