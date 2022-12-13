import { FC } from "react";

interface SelectType {
  children: any;
  onChange?: any;
  value?: string | number;
}

const Select: FC<SelectType> = ({ value, onChange, children, ...rest }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      {...rest}
      className="w-full p-2 h-10 rounded border border-2 text-sm"
    >
      {children}
    </select>
  );
};

export default Select;
