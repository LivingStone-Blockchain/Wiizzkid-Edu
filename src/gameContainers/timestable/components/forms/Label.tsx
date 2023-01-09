import { FC } from "react";

interface LabelType {
  children: any;
}

const Label: FC<LabelType> = ({ children }) => {
  return (
    <label htmlFor="" className="mb-2 block text-gray-600 space-x-5 my-3 md:text-base text-sm leading-relaxed font-normal">
      {children}
    </label>
  );
};

export default Label;
