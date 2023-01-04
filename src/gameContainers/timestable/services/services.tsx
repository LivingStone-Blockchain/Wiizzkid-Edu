import axios from 'axios';

const baseUrl = 'https://wiizkidapi.herokuapp.com';



type gameDetailsType = {
    difficulty: string,
    total_players: number, 
    game_mode: string, 
    game_duration: number,
    creator: number,
}


const getAll = async () => {
    const response = await axios.get(`${baseUrl}/timestable/game/?format=json`);
    return response.data;
}


const createGame = async (gameDetails: gameDetailsType) => {
    const response = await axios.post(`${baseUrl}/timestable/game/`, gameDetails)
    return response.data;
}

const service = { getAll, createGame };
export default service;