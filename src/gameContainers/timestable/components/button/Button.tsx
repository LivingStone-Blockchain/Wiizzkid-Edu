import { FC } from "react";

interface ButtonProps {
  children: React.ReactNode | string;
  onClick?: () => void;
  btnDefault?: boolean;
  className?: string;
  type?: "button" | "submit";
  style?: React.CSSProperties;
}

const Button: FC<ButtonProps> = ({
  className,
  onClick,
  btnDefault = false,
  type,
  children,
  style,
}) => {

  if (btnDefault) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${className} flex items-center justify-center transition py-3 font-bold`}
        style={style}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} rounded-full transform transition hover:scale-110 duration-300 ease-in-out z-60`}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
