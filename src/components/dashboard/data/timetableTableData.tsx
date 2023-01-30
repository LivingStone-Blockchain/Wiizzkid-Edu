type initialTableDataType = {
    total_players: number
    game_mode: string
    game_duration: number
    created_at: string
    difficulty: string
    gameId: string
    playerId: number
    invite_code: string
    score: {
        player_id: number
        game_id: string
        score: number
        total_attempted: number
    }
}


type mappedTableDataType = {
    total_players: number,
    game_mode: string,
    game_duration: number,
    created_at: string,
    difficulty: string,
    gameId: string,
    playerId: number,
    invite_code: string,
    score: number | string | React.ReactNode,
    total_attempted: number
}






type RecentGamesDataType = {
    games: {
        total_players: number
        game_mode: string
        game_duration: number
        created_at: string
        difficulty: string
        id: number
        creator: number
        invite_code: string
      }[]
      scores: {
        player_id: number
        game_id: string
        score: number
        total_attempted: number
      }[]
}





export const tableData = (recentGames: RecentGamesDataType) => {
  const initialTableData: initialTableDataType[] = recentGames?.games.map((item: any) => {
    return {
      category: item.category,
      created_at: item.created_at,
      playerId: item.creator,
      difficulty: item.difficulty,
      game_duration: item.game_duration,
      game_mode: item.game_mode,
      gameId: item.id,
      invite_code: item.invite_code,
      total_players: item.total_players,
      total_questions: item.total_questions,
      score: recentGames?.scores.flat().map((item) => {
        return {
          game_id: item.game_id,
          player_id: item.player_id,
          score: item.score,
          total_attempted: item.total_attempted
        }
      }).filter((items) => items.game_id === item.id)[0]
    }
  });
  
//filter off uncompleted games with undefined scores and only return data for current year
  const mappedTableData: mappedTableDataType[] = initialTableData?.filter((item) => item.score !== undefined && new Date(item.created_at).getFullYear() === new Date().getFullYear()).map((item) => {
    return {
      created_at: `${new Date(item.created_at).toString().split(' ')[2]}-${new Date(item.created_at).toString().split(' ')[1]}-${new Date(item.created_at).getFullYear().toString().slice(2, 4)} ${new Date(item.created_at).toString().split(' ')[4]}`,
      playerId: item.playerId,
      difficulty: item.difficulty,
      game_duration: item.game_duration,
      game_mode: item.game_mode,
      gameId: item.gameId.slice(0, 8),
      invite_code: item.invite_code,
      total_players: item.total_players,
      score: <span className='flex justify-start items-center gap-2'><span className={`w-[6px] h-[6px] rounded-full ${item.score?.score === 0 ? "bg-tomato" : item.score?.score / item.score?.total_attempted <= 0.5 ? "bg-golden" : "bg-teal"}`}></span><span className="text-sm">{item.score?.score}/{item.score?.total_attempted}</span></span>,
      total_attempted: item.score?.total_attempted,
    }
  })

  return mappedTableData;
}
