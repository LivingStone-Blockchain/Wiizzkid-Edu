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


type ScoreDetailsType = {
    player_id: number | undefined,
    game_id: string | undefined,
    score: number,
    submit_time: number
}



const getAll = async () => {
    const response = await axios.get(`${baseUrl}/quiz/questions/?format=json`);
    return response.data;
}


const createGame = async (gameDetails: gameDetailsType, token:string) => {
    const config = {
        headers: { 
                Authorization: `Bearer ${token}`,
             },
    };
    
    const response = await axios.post(`${baseUrl}/quiz/game/`, gameDetails, config)
    return response.data;
}

const joinGame = async (invite_code: string, token:string) => {
    const config = {
        headers: { 
                Authorization: `Bearer ${token}`,
             },
    };
    
    const response = await axios.post(`${baseUrl}/quiz/games/${invite_code}/join`, {invite_code}, config)
    return response.data;
}

const scoreResult = async (scoreDetails: ScoreDetailsType) => {
    const response = await axios.post(`${baseUrl}/quiz/scoreboard/`, scoreDetails);
    return response.data;
}

const recentResults = async (id:string ) => {
    const response = await axios.get(`${baseUrl}/quiz/recent/${id}`);
    return response.data;
}

//tracks joiner in real time
const playersTracker = async (gameId: string) => {
    const response = await axios.get(`${baseUrl}/quiz/game/${gameId}/players/`);
    return response.data;
}


const leaderBoard = async (gameId: string) => {
    const response = await axios.get(`${baseUrl}/quiz/result/${gameId}`);
    return response.data;
}




const service = { getAll, createGame, scoreResult, recentResults, joinGame, playersTracker, leaderBoard };
export default service;