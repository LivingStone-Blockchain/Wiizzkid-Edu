import axios from "axios";


type credentialsType = {
    email: string,
}




const baseUrl = import.meta.env.VITE_HOST_BASE_URL;



const forgotPassword = async (credentials: credentialsType) => {
    const response = await axios.post(`${baseUrl}/user/request-password-reset/`, credentials);
    return response.data;
}

const forgotPasswordService = { forgotPassword };
export default forgotPasswordService;