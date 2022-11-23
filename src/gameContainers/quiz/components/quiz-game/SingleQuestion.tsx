import { FC, useContext } from "react";
import { FaRegCircle, FaRegDotCircle } from "react-icons/fa";
import { GameContext, GameContextType } from "../../../../context/game.context";

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
  const { addAnswer } = useContext(GameContext) as GameContextType;

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
      className={`grid grid-cols-12 gap-2 py-4 ${
        title === selectedOption ? "bg-orange-300" : "bg-white"
      } shadow-2xl cursor-pointer transition border rounded px-4`}
    >
      <span className="col-span-2 text-2xl md:text-sm mt-1">
        {title === selectedOption ? <FaRegDotCircle /> : <FaRegCircle />}
      </span>

      <span className="text-lg md:text-sm col-span-10">{title}</span>
    </li>
  );
};

export default SingleQuestion;
