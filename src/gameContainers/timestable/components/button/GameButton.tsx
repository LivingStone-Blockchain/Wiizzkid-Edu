import { FC } from "react";

type ButtonProps =  {
  value: React.ReactNode | string | number;
  onClick?:(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  type?: "button" | "submit";
  style?: React.CSSProperties;
}

const Button: FC<ButtonProps> = ({
  className,
  onClick,
  type,
  value,
  style,

}) => {

 return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} w-full md:h-20 h-16 outline-none focus:outline-none  text-white text-xl font-medium`}
      style={style}
    >
      {value}
    </button>
  );
};

export default Button;
