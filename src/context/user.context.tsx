import { createContext, FC, useState, useEffect } from "react";
import registerService from "../services/register";
import { useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


type registerFormikType = {
    full_name: string,
    email: string,
    password: string,
    confirmPassword: string,
    acceptTerms: boolean,
}

export interface UserContextType {
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    emailNotify: string,
    setEmailNotify: React.Dispatch<React.SetStateAction<string>>,
    registerFormik: FormikProps<registerFormikType>,
}

export const UserContext = createContext<UserContextType | null>(null);



const UserProvider: FC<any> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [emailNotify, setEmailNotify] = useState<string>('');
    const navigate = useNavigate();


   
//Handle signup
const registerFormik: FormikProps<registerFormikType> = useFormik<registerFormikType>({
    initialValues: {
      full_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: true
    },
     validationSchema: Yup.object({
        full_name: Yup.string()
            .required("Full name is required")
            .matches(/(\w.+\s).+/, 'Enter at least 2 names'),
        email: Yup.string().email().required("Email is required."),
        password: Yup.string().required('Password is required')
            .min(8, "Password length must be 8 char"),
        confirmPassword: Yup.string()
            .required("Confirm your password")
            .oneOf([Yup.ref('password'), null], "Passwords don't match"),
        acceptTerms: Yup.bool().default(true).oneOf([false], 'Accept privacy policy')
    }),
    onSubmit: async function (values) {
        let email = values.email;
        let full_name =  values.full_name;
        let password = values.confirmPassword;
         setIsLoading(true);
         
        try {
            await registerService.register({
                email, full_name, password,
            });

            values.email="";
            values.full_name ="";
            values.password="";
            values.confirmPassword="";
  
            setEmailNotify(email);
            navigate('/registration-notification');
            setIsLoading(false);
        } catch (error) {
            toast.error("'Account already exists!", { duration: 5000, id: "register" });

            setTimeout(() => {
                toast.dismiss("register");
            }, 5000);
            setIsLoading(false);
        }
    },
  })


    return (
        <UserContext.Provider 
            value={{ isLoading, setIsLoading, registerFormik, emailNotify, setEmailNotify }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;