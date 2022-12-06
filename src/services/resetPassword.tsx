import axios from "axios";


type credentialsType = {
    password: string,
    data: {
        uidb64: string,
        token: string,
    }
}




const baseUrl = import.meta.env.VITE_HOST_BASE_URL;



const resetPassword = async (credential: credentialsType) => {
    const response = await axios.post(`${baseUrl}/user/password-reset-complete/`, credential);
    return response.data;
}

const resetPasswordService = { resetPassword };
export default resetPasswordService;