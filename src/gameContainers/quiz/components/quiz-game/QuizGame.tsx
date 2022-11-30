import { FC, useContext, useEffect, useState, useRef } from "react";
import {
  FaArrowRight,
  FaClock,
  FaQuestionCircle,
  FaTimes,
} from "react-icons/fa";
import categoryStrings from "../functions/categoryStringConveter";
import timeDiffCalculator from "../functions/timeDifference";
import quizCompletedToast from "../toasts/quizCompleteToast";
import quizEndGameToast from "../toasts/quitGameToast";
import QuizQuestionCard from "./QuizQuestionCard";
import toast from "react-hot-toast";
import { QuizContext, QuizContextType } from "../../../../context/quiz.context";
import CountDownTimer from "../CountDownTimer";
import { useNavigate } from 'react-router-dom';


interface QuizGameTypes {
  showModal: true | false;
}

/*interface QuestionBankIdentifierTypes {
  category: number;
  question: string;
  options: string[];
  difficulty: string;
  id: number;
  tags: string[];
}*/


const QuizGame: FC<QuizGameTypes> = ({ showModal }) => {
  const { quizData, score, setStart, timeOfStart, category, difficulty, totalAllowedQuestions, gameDuration, submitTimeRef, selectedOption, setSelectedOption, gameMode, triviaFetch, setTriviaFetch, gameDetails } = useContext(QuizContext) as QuizContextType;

  const submitText = useRef<HTMLSpanElement>(null!);
  const navigate = useNavigate();  
  const [questions, setQuestions] = useState<any>([]);
  const [current_question, setCurrentQuestion] = useState<any>({});
  const [current_page, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);




  // restructure fetched data
  const mapped_questions = quizData?.map((question) => {
    return {
      category: typeof(question.category) === "number" ? categoryStrings(question.category) : question.category,
      question: question.question,
      options: [question.correctAnswer, ...question.incorrectAnswers].sort(() => Math.random() - 0.5), //sorted for randomization
      difficulty: question.difficulty,
      id: question.id,
      tags: [...question.tags],
    };
  })

  //sort and filter restructured based on api url's returned data
  let sortedMapped_questions = triviaFetch 
    ? mapped_questions
    : mapped_questions?.filter((data) => data.category.toLowerCase() === categoryStrings(Number(category)).toLowerCase()  && (data.difficulty).toLowerCase() === difficulty.toLowerCase()).sort(() => Math.random() - 0.5).slice(0, totalAllowedQuestions);



  //render first question from array on page load
  useEffect(() => {

    setCurrentQuestion(sortedMapped_questions![0]);
    setCurrentPage(0);
    setQuestions([...sortedMapped_questions!]);

    return;
  }, [quizData]);
  


  const handleGoToNextQuestion = () => {
    if (current_page + 1 >= questions.length) {
      return toast.success("You have reached the end of the quiz game!");
    }

    setSelectedOption('');
    setCurrentQuestion(questions[current_page + 1]);
    setCurrentPage((prev) => prev + 1);
    return;
  };



  const quitGame = () => {
    setLoading(true);
    setTriviaFetch(false);
    quizEndGameToast(setLoading, navigate);
    return;
  };


  const submitQuiz = () => {
    //freeze time
    submitTimeRef.current.innerText = submitTimeRef.current?.innerText;
    const submitTimeArray = submitTimeRef.current?.innerText.split(':');
    setLoading(true);

    toast.loading("Submitting, please wait...", { duration: 5000, id: "completed" });


    const payload = {
      gameId: gameDetails?.id,
      score,
      submitTime: submitTimeArray[0] * 60 + (+submitTimeArray[1].split(' ')[0]), //convert say mm:ss to seconds. Highest time wins if score is tied.
    };

   
    // send payload to backend...
    setTimeout(() => {
      console.log(payload);
      toast.dismiss("completed");
      quizCompletedToast(score, totalAllowedQuestions, timeDiffCalculator(gameDuration, payload.submitTime), setStart, setTriviaFetch, navigate);
      submitText.current.innerText = "Submitted";
      return;
    }, 5000);

 
  };


  const handleFinalSubmit = (e: any) => {
    e.preventDefault();
    submitQuiz();
  };

  if (!showModal) {
    return null;
  }

 

  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 h-full bg-gray-100 z-50 text-gray-700 p-6 overflow-y-scroll pb-40 transition">
      {loading && (
        <div className="bg-black opacity-50 fixed top-0 bottom-0 z-50 w-full h-full left-0 right-0"></div>
      )}

      <div className="max-w-xl mx-auto opacity-90">
        <nav className="flex justify-between items-center">
          <FaTimes
            className="text-2xl cursor-pointer"
            onClick={quitGame}
          />

        <h1 className="font-bold text-xl">{`${categoryStrings(Number(category))[0].toUpperCase()}${categoryStrings(Number(category)).slice(1)} Quiz`}</h1>

          <div className="group max-w-max relative mx-1 flex flex-col items-center justify-center">
              <FaQuestionCircle className="text-2xl cursor-pointer"/>   
                <div className="[transform:perspective(50px)_translateZ(0)_rotateX(10deg)] group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)] mb-6 origin-bottom transform rounded text-white opacity-0 transition-all duration-300 group-hover:opacity-100 absolute top-7 right-0 md:inset-x-auto">
                    <div className="max-w-xs flex-col items-center">
                    <div className="clip-bottom h-2 w-4 bg-gray-700 hidden md:flex mx-auto" style={{clipPath: "polygon(0% 50%, 100% 100%, 0% 100%, 50% 0%, 100% 100%)"}}></div>
                        <div className="w-52 rounded bg-gray-700 font-semi-bold p-2 text-xs text-center shadow-lg">Make sure to answer this question before proceeding to the next.</div>                
                    </div>
                </div>
            </div>
        </nav>

        <main className="py-10">
          <QuizQuestionCard
            question={current_question?.question}
            category={current_question?.category}
            options={current_question?.options}
            difficulty={current_question?.difficulty}
            id={current_question?.id}
            tags={current_question?.tags}
            type={current_question?.type}
            page={`${current_page + 1}/${totalAllowedQuestions}`}
          />
        </main>

        <footer className="fixed bottom-0 right-0 left-0 w-full bg-gray-100 shadow p-4 flex items-center justify-between">
          <span className="font-bold animate-pulse flex items-center">
            <FaClock className="mr-2" />{" "}
            {/* add game.durationInMinutes to 'timeOfStart' */}
            {timeOfStart && (
              <CountDownTimer
                date={timeOfStart + 60000 * gameDuration}
                handleSubmit={submitQuiz}
              />
            )}
          </span>

          {selectedOption && current_page + 1 === questions.length? (
            <form onSubmit={handleFinalSubmit}>
              <ActionButton className="bg-red-100" disabled={loading}>
                {loading ? <span ref={submitText}>Submitting</span> : "Submit Game"}
              </ActionButton>
            </form>
          ) : (
            <ActionButton className={selectedOption ? "cursor-pointer border-orange-600" : "cursor-not-allowed border-gray-700"} onClick={handleGoToNextQuestion} disabled={selectedOption ? false : true}>
              Next <FaArrowRight className="ml-3" />
            </ActionButton>
          )}
        </footer>
      </div>
    </section>
  );
};

function ActionButton({
  children,
  className,
  disabled,
  onClick,
}: {
  children: any;
  className?: string;
  disabled?: true | false;
  onClick?: () => void;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${className} px-6 py-2 flex items-center border-2 border-orange-600 rounded shadow text-center text-sm font-bold text-orange-600 hover:from-yellow-600 hover:to-orange-700 transition`}
    >
      {children}
    </button>
  );
}

export default QuizGame;
