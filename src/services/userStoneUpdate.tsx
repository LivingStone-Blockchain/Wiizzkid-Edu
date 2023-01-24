import axios from 'axios';


type credentialsType = {
    stone_token: number,
    wallet_address: string
}


const baseUrl = import.meta.env.VITE_HOST_BASE_URL;





const stoneUpdate = async (credentials: credentialsType, id: number, token:string) => {
    const config = {
        headers: { 
                Authorization: `Bearer ${token}`,
             },
    };

    const response = await axios.patch(`${baseUrl}/user/account/${id}/`, credentials, config);
    return response.data;
}

const userUpdateService = { stoneUpdate };
export default userUpdateService;