import { FC, useContext } from "react";
import SingleQuestion from "./SingleQuestion";
import toast from "react-hot-toast";
import {QuizContext,QuizContextType } from "../../../../context/quiz.context";


interface QuizQuestionCardProps {
  category: string;
  question: string;
  options: string[];
  difficulty: string;
  id: string;
  tags: string[];
  type: string;
  page: string;
}

const QuizQuestionCard: FC<QuizQuestionCardProps> = (question) => {
  const { selectedOption, setSelectedOption } = useContext(QuizContext) as QuizContextType;



  setTimeout(() => {
    toast.dismiss("begin");
  }, 5000);

  const handleSelectOption = (title: string) => {
    setSelectedOption(title);
  };



  return (
    <div>
      <article>
        <h2 className="font-bold text-yellow-500 mb-4">
          Question {question?.page}
        </h2>

        <h1 className="text-2xl md:text-lg text-[#252641] font-bold tracking-wide">
          {question?.question}
        </h1>
      </article>

      <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 transition">
        {question?.options?.map((option, index) => (
          <SingleQuestion
            questionId={question.id}
            key={index + 1}
            title={option}
            selectedOption={selectedOption}
            handleSelectOption={handleSelectOption}
          />
        ))}
      </ul>
    </div>
  );
};

export default QuizQuestionCard;
