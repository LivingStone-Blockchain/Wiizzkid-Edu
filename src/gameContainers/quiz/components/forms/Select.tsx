import { FC } from "react";

interface SelectType {
  id?: string
  children: any;
  onChange?: any;
  value?: string | number;
}

const Select: FC<SelectType> = ({ value, onChange, children, id, ...rest }) => {
  return (
    <select
      value={value}
      id={id}
      onChange={onChange}
      {...rest}
      className="w-full p-2 h-10 rounded border-2 text-sm"
    >
      {children}
    </select>
  );
};

export default Select;
