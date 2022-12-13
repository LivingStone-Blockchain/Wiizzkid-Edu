import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Wrapper, Screen, ButtonBox } from '../components/index';
import { TimestableContext, TimestableContextType } from '../../../context/timestable.context';
import { timestableMock } from "../data/questionBank";
import { Countdown } from '../components/index';
import GameCompletedToast from '../components/GameCompletedToast';
import Overlay from '../components/Overlay';
import { toast } from 'react-hot-toast';


type timestableData = {
  title: string,
  correctAnswer: number,
  difficulty: string
}




const TimestablePlay= () => {
  const { handleDigit, handleDelete, digit, setDigit, scoreTracker, difficulty, gameDuration, score, start, setStart, setShowCreateGameModal } = useContext(TimestableContext) as TimestableContextType;
  const [questions, setQuestions] = useState<timestableData[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<timestableData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const navigate = useNavigate();
  const btnValues = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ["Delete", 0, "Enter"],
  ];

  //Randomize questions
  const mappedQuestions = timestableMock.filter(q => q.difficulty === difficulty).sort(() => Math.random() - 0.5);

  useEffect(() => {
    setCurrentQuestion(mappedQuestions[0]);
    setQuestions([...mappedQuestions])
    setCurrentPage(0);
  }, [timestableMock])


  const handleEvaluation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (currentPage + 1 >= questions.length) {
      return window.confirm("End")
    }

    setDigit({ num: 0 })
    setCurrentQuestion(questions[currentPage + 1]);
    setCurrentPage((prev) => prev + 1);

    //collate scores
    scoreTracker(currentQuestion!.correctAnswer);

  }




useEffect(() => {
  //dismiss first to avoid duplicates
  if (!start)  {
    toast.dismiss();
    toast(
      <GameCompletedToast score={score} gameDuration={gameDuration} totalAttempted={currentPage} navigate={navigate} setShowCreateGameModal={setShowCreateGameModal}/>,
      { duration: Infinity, className: "w-full" }
    )
  }
}, [start])


  return (
    <Wrapper>
      <Overlay loading={!start && true} />
      <Screen
        className='bg-gradient-to-b from-navy to-gray-800 text-center'
        value={currentQuestion?.title}
      />
      <Screen
        className='bg-gradient-to-b from-gray-800 to-gray-700 text-right'
        children={<Countdown duration={gameDuration} setStart={setStart} />}
        value={digit.num}
        timer={true}
      />

      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                timestableBtn={true}
                onClick={
                  btn === "Enter"
                    ? handleEvaluation
                    : btn === "Delete"
                      ? handleDelete
                      : handleDigit
                }
                value={btn}
                type='button'
                className={`border border-indigo-400 rounded-lg ${btn === "Delete" ? ' bg-tomato hover:bg-opacity-90' : btn === "Enter" ? ' bg-teal hover:bg-opacity-80' : 'bg-pop hover:bg-transparent'}`}
              />
            )
          })
        }
      </ButtonBox>
    </Wrapper>
  )
}

export default TimestablePlay;

