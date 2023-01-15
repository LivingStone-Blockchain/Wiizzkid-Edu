import axios from 'axios';


type credentialsType = {
    refresh: string,
}


const baseUrl = import.meta.env.VITE_HOST_BASE_URL;





const refreshToken = async (refresh: credentialsType) => {

    const response = await axios.post(`${baseUrl}/user/token/refresh/`, refresh);
    return response.data;
}

const refreshTokenService = { refreshToken };
export default refreshTokenService;