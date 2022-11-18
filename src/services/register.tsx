import axios from "axios";


type credentialsType = {
    full_name: string,
    email: string,
    password: string
}


/*const baseUrl = process.env.NODE_ENV === 'development' 
? import.meta.env.VITE_LOCAL_BASE_URL
: import.meta.env.VITE_HOST_BASE_URL;*/


const baseUrl = import.meta.env.VITE_HOST_BASE_URL;



const register = async (credentials: credentialsType) => {
    const response = await axios.post(`${baseUrl}/user/register/`, credentials);
    return response.data;
}

const registerService = { register };
export default registerService;