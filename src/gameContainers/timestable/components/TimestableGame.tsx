import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from './index';
import { GameButton, ButtonBox } from './button/index';
import { TimestableContext, TimestableContextType } from '../../../context/timestable.context';
import { timestableMock } from "../data/questionBank";
import { Countdown } from './index';
import GameCompletedToast from './toasts/GameCompletedToast';
import { toast } from 'react-hot-toast';
type timestableData = {
  title: string,
  correctAnswer: number,
  difficulty: string
}




const TimestableGame = () => {
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
    if (!start) {
      toast.dismiss();
      toast(
        <GameCompletedToast score={score} gameDuration={gameDuration} totalAttempted={currentPage} navigate={navigate} setShowCreateGameModal={setShowCreateGameModal} />,
        { duration: Infinity, className: "w-full" }
      )
    }
  }, [start])


  return (
    <section data-aos="fade-up" data-aos-delay="200" data-aos-once="true" className="w-full mx-auto rounded-xl bg-gray-300 shadow-xl space-y-1 text-gray-800 relative overflow-hidden lg:max-w-[550px] md:max-w-[75%] max-w-[95%]" >

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
              <GameButton
                key={i}
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
    </section>
  )
}

export default TimestableGame;

