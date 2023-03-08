import axios from 'axios';

const baseUrl = import.meta.env.VITE_HOST_BASE_URL;



type gameDetailsType = {
    difficulty: string,
    total_players: number, 
    game_mode: string, 
    game_duration: number,
    creator: number,
}


type ScoreDetailsType = {
    player_id: number | undefined,
    game_id: string | undefined,
    score: number,
    total_attempted: number
}




const createGame = async (gameDetails: gameDetailsType, token:string) => {
    const config = {
        headers: { 
                Authorization: `Bearer ${token}`,
             },
    };

    const response = await axios.post(`${baseUrl}/timetable/game/`, gameDetails, config)
    return response.data;
}



const joinGame = async (invite_code: string, token:string) => {
    const config = {
        headers: { 
                Authorization: `Bearer ${token}`,
             },
    };
    
    const response = await axios.post(`${baseUrl}/timetable/games/${invite_code}/join`, {invite_code}, config)
    return response.data;
}

const scoreResult = async (scoreDetails: ScoreDetailsType) => {
    const response = await axios.post(`${baseUrl}/timetable/scoreboard/`, scoreDetails);
    return response.data;
}

const recentResults = async (id:string ) => {
    const response = await axios.get(`${baseUrl}/timetable/recent/${id}`);
    return response.data;
}

//tracks joiner in real time
const playersTracker = async (gameId: string) => {
    const response = await axios.get(`${baseUrl}/timetable/game/${gameId}/players/`);
    return response.data;
}


const leaderBoard = async (gameId: string) => {
    const response = await axios.get(`${baseUrl}/timetable/result/${gameId}`);
    return response.data;
}




const service = { createGame, scoreResult, recentResults, joinGame, playersTracker, leaderBoard };
export default service;