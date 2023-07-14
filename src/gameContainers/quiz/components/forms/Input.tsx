import React, { FC } from "react";

interface InputType {
  placeholder?: string;
  type?: string;
  min?: number;
  max?: number;
  value?: string | number;
  id?:string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputType> = ({ type = "text", value, id, onChange, placeholder, min, max }) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      id={id}
      onChange={onChange}
      min={min}
      max={max}
      className="w-full rounded border-2 p-2 text-sm"
    />
  );
};

export default Input;
