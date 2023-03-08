import axios from 'axios';


type credentialsType = {
    stone_token: number,
    wallet_address: string,
    stone_token_winnings: number | undefined
}


type userUpdateOnTokenDeductionType = {
    players?: number[]
}



const baseUrl = import.meta.env.VITE_HOST_BASE_URL;

const getUser = async (id: number, token:string) => {
    const config = {
        headers: { 
                Authorization: `Bearer ${token}`,
             },
    };

    const response = await axios.get(`${baseUrl}/user/account/${id}/`, config);
    return response.data;
}





const stoneUpdate = async (credentials: credentialsType, id: number, token:string) => {
    const config = {
        headers: { 
                Authorization: `Bearer ${token}`,
             },
    };

    const response = await axios.patch(`${baseUrl}/user/account/${id}/`, credentials, config);
    return response.data;
}




const userUpdateOnTokenDeduction = async (credentials: userUpdateOnTokenDeductionType, gameId: string, token:string) => {
    const config = {
        headers: { 
                Authorization: `Bearer ${token}`,
             },
    };

    const response = await axios.patch(`${baseUrl}/quiz/games/${gameId}/`, credentials, config);
    return response.data;
}




const userDetailsService = { stoneUpdate, getUser, userUpdateOnTokenDeduction };
export default userDetailsService;