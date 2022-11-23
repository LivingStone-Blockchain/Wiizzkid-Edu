import { FC } from "react";

interface LabelType {
  children: any;
}

const Label: FC<LabelType> = ({ children }) => {
  return (
    <label htmlFor="" className="mb-2 block text-sm">
      {children}
    </label>
  );
};

export default Label;
