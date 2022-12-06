import React, { createContext, FC, useState, useEffect, useCallback } from "react";
import { registerService, loginService, forgotPasswordService } from "../services";
import { useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import toast from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom';


type registerFormikType = {
    full_name: string,
    email: string,
    password: string,
    confirmPassword: string,
    referral: string,
}



type userType = {
    email: string,
    tokens: {
        access: string,
        refresh: string,
    },
    full_name: string,
    stone_token: number,
    id: number,
}

export interface UserContextType {
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    emailNotify: string,
    setEmailNotify: React.Dispatch<React.SetStateAction<string>>,
    emailLogin: string,
    setEmailLogin: React.Dispatch<React.SetStateAction<string>>,
    passwordLogin: string,
    setPasswordLogin: React.Dispatch<React.SetStateAction<string>>,
    forgotPasswordEmail: string,
    setForgotPasswordEmail: React.Dispatch<React.SetStateAction<string>>,
    user: userType | null,
    setUser: React.Dispatch<React.SetStateAction<userType | null>>,
    registerFormik: FormikProps<registerFormikType>,
    handleLogin: (event: React.FormEvent<HTMLFormElement>) => Promise<void>,
    handleForgotPassword: (event: React.FormEvent<HTMLFormElement>) => Promise<void>,
    handleLogout: () => void,
}

export const UserContext = createContext<UserContextType | null>(null);



const UserProvider: FC<any> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [emailNotify, setEmailNotify] = useState<string>('');
    const [emailLogin, setEmailLogin] = useState<string>('');
    const [passwordLogin, setPasswordLogin] = useState<string>('');
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string>('');
    const [user, setUser] = useState<userType | null>(null);
    const navigate = useNavigate();
    const param = useParams();





    //login users automatically
    useEffect(() => {
        const loggedUSerJSON = window.localStorage.getItem('loggedWiizzikidUser');
        if (loggedUSerJSON) {
            const recoveredUser = JSON.parse(loggedUSerJSON);
            setUser(recoveredUser);
        }
    }, []);


    //Handle signup
    const registerFormik: FormikProps<registerFormikType> = useFormik<registerFormikType>({
        initialValues: {
            full_name: '',
            email: '',
            password: '',
            confirmPassword: '',
            referral: '',
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
            referral: Yup.string()
            .required("Referral code is required")
        }),
        onSubmit: async function (values) {
            let email = values.email;
            let full_name = values.full_name;
            let password = values.confirmPassword;
            let referral_code = values.referral
            setIsLoading(true);


            try {
                await registerService.register({
                    email, full_name, password, referral_code
                });

                values.email = "";
                values.full_name = "";
                values.password = "";
                values.confirmPassword = "";
                values.referral = "",

                setEmailNotify(email);
                navigate('/registration-notification');
                setIsLoading(false);
            } catch (error: any) {
                toast.error(`${error.response.data.errors.email[0]}!`, { duration: 5000, id: "register" });

                setTimeout(() => {
                    toast.dismiss("register");
                }, 5000);
                setIsLoading(false);
            }
        },
    })




    //Handle login
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsLoading(true);

        let email = emailLogin;
        let password = passwordLogin;

        try {
            const user = await loginService.login({
                email, password,
            });


            window.localStorage.setItem(
                'loggedWiizzikidUser', JSON.stringify(user)
            );
            setUser(user);
            setEmailLogin('');
            setPasswordLogin('');
            //navigate('/', { replace: true });
            navigate(-1);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error("Login failed!", { duration: 5000, id: "login" });

            setTimeout(() => {
                toast.dismiss("login");
            }, 5000);
            setIsLoading(false);
        }
    };



    //forgot password handler
    const handleForgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsLoading(true);
        let email = forgotPasswordEmail;

        try {
            await forgotPasswordService.forgotPassword({
                email,
            });

            setForgotPasswordEmail("");
            setIsLoading(false);
            toast.success("Password reset link sent to your email account!", { duration: 50000, id: "forgot" });
        } catch (error) {
            setIsLoading(false);
            toast.error("Password reset failed!", { duration: 5000, id: "forgot" });
            setTimeout(() => {
                toast.dismiss("forgot");
            }, 5000);
        }
    };
  



    //logout handler
    const handleLogout = useCallback(() => {

        setIsLoading(true);
        navigate('/login');
        window.localStorage.removeItem('loggedWiizzikidUser');
        setEmailLogin('');
        setPasswordLogin('');
        setUser(null);
    }, [navigate]);





    return (
        <UserContext.Provider
            value={{ isLoading, setIsLoading, registerFormik, emailNotify, setEmailNotify, emailLogin, setEmailLogin, passwordLogin, setPasswordLogin, user, setUser, handleLogin, handleLogout, forgotPasswordEmail, setForgotPasswordEmail, handleForgotPassword }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;