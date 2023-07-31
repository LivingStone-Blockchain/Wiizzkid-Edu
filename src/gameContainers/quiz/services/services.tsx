import axios from 'axios';


const baseUrl = import.meta.env.VITE_HOST_BASE_URL;



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

type totalPlayers = {
    total_players: number
}


type SubmitOption = {
    option: string
}



const getAll = async (page: number) => {
    const response = await axios.get(`${baseUrl}/quiz/questions/?format=json&page=${page}`);
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

//update games's current player in real time
const currentPayerUpdate = async (gameId: string, totalPlayers: totalPlayers, token:string) => {
    const config = {
        headers: { 
                Authorization: `Bearer ${token}`,
             },
    };
    const response = await axios.patch(`${baseUrl}/quiz/games/${gameId}/`, totalPlayers, config);
    return response.data;
}


//get games's current state
const currentGame = async (gameId: string, token:string) => {
    const config = {
        headers: { 
                Authorization: `Bearer ${token}`,
             },
    };
    const response = await axios.get(`${baseUrl}/quiz/games/${gameId}/`, config);
    return response.data;
}


//checks all players submit
const checkPlayersSubmit = async (gameId:string ) => {
    const response = await axios.get(`${baseUrl}/quiz/check_submit/${gameId}/`);
    return response.data;
}

//checks all players submit
const enforcePlayersSubmit = async (gameId:string, option: SubmitOption ) => {
    const response = await axios.post(`${baseUrl}/quiz/check_submit/${gameId}/`, option);
    return response.data;
}

const leaderBoard = async (gameId: string) => {
    const response = await axios.get(`${baseUrl}/quiz/result/${gameId}`);
    return response.data;
}




const service = { getAll, createGame, scoreResult, currentGame, currentPayerUpdate, checkPlayersSubmit, recentResults, joinGame, playersTracker, leaderBoard, enforcePlayersSubmit };
export default service;