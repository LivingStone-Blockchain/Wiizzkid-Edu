import axios from 'axios';

const baseUrl = 'https://wiizkidapi.herokuapp.com';



type gameDetailsType = {
    difficulty: string,
    total_questions: number,
    total_players: number, 
    game_mode: string, 
    game_duration: number,
    category: number | string,
    creator: number,
}



const getAll = async () => {
    const response = await axios.get(`${baseUrl}/quiz/questions/?format=json`);
    return response.data;
}


const createGame = async (gameDetails: gameDetailsType) => {
    const response = await axios.post(`${baseUrl}/quiz/game/`, gameDetails)
    return response.data;
}

const service = { getAll, createGame };
export default service;