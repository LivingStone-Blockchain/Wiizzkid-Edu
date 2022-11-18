import axios from "axios";



type credentialsType = {
    email: string,
    password: string
}




const baseUrl = import.meta.env.VITE_HOST_BASE_URL;


const login = async (credentials: credentialsType) => {
    const response = await axios.post(`${baseUrl}/user/login/`, credentials);
    return response.data;
}

const loginService = { login };
export default loginService;