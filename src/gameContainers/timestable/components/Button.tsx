import { FC } from "react";

type ButtonProps =  {
  value: React.ReactNode | string | number;
  onClick?:(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  type?: "button" | "submit";
  style?: React.CSSProperties;
  timestableBtn?: boolean,
}

const Button: FC<ButtonProps> = ({
  className,
  onClick,
  type,
  value,
  style,
  timestableBtn
}) => {

 if(timestableBtn) {
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
 }

 return (
  <button
  type={type}
  onClick={onClick}
  className={`${className} flex items-center justify-center transition px-8 py-3 bg-gradient-to-r from-orange-600 to-yellow-600 rounded text-white text-center font-bold text-sm hover:from-yellow-600 hover:to-orange-600`}
>
  {value}
</button>
)
};

export default Button;
