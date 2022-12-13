import { FC } from "react";

interface FormGroupType {
  children: any;
}

const FormGroup: FC<FormGroupType> = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

export default FormGroup;
