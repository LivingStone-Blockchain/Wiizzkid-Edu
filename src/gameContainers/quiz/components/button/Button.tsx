import { FC, useState } from "react";

interface ButtonProps {
  children: any;
  onClick?: () => void;
  btnDefault?: boolean;
  className?: string;
  type?: "button" | "submit";
}

const Button: FC<ButtonProps> = ({
  className,
  onClick,
  btnDefault = false,
  type,
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  if (btnDefault) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${className} flex items-center justify-center transition py-3 font-bold`}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} flex items-center justify-center transition px-8 py-3 bg-gradient-to-r from-orange-600 to-yellow-600 rounded text-white text-center font-bold text-sm hover:from-yellow-600 hover:to-orange-600`}
    >
      {children}
    </button>
  );
};

export default Button;
