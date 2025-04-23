import { FC, useContext } from "react";
import { Circle, CircleDot } from "lucide-react";
import { QuizContext, QuizContextType } from "../../../../context/quiz.context";

interface SingleQuestionProps {
  questionId: string;
  title: string;
  selectedOption: string | number;
  handleSelectOption: Function;
}

const SingleQuestion: FC<SingleQuestionProps> = ({
  questionId,
  title,
  selectedOption,
  handleSelectOption,
}) => {
  const { addAnswer } = useContext(QuizContext) as QuizContextType;

  const handleSelect = () => {
    handleSelectOption(title);

    const payload = {
      questionId,
      option: title,
    };

    return addAnswer(payload);
  };

  return (
    <li
      onClick={handleSelect}
      className={`grid grid-cols-12 gap-2 py-4 items-center ${
        title === selectedOption ? "bg-[#ffa6a6]" : "bg-white"
      } shadow-2xl cursor-pointer transition border rounded px-4 text-navy`}
    >
      <span className="col-span-2 text-xl md:text-sm">
        {title === selectedOption ? <CircleDot /> : <Circle />}
      </span>

      <span className="text-base md:text-sm md:font-semibold font-medium col-span-10">{title}</span>
    </li>
  );
};

export default SingleQuestion;