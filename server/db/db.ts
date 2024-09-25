import connection from './connection'
import { Game } from '../../models/games'

const db = connection

//get all games
export function getAllGames(): Promise<Game[]> {
  return db('gamelog').select(
    'id',
    'game',
    'played_before as playedBefore',
    'clocked_before as clockedBefore',
    'platform',
    'start_date as startDate',
    'finish_date as finishDate',
    'playtime_estimate as playtimeEstimate',
    'playtime_final as playtimeFinal',
    'gameplay_rating as gameplayRating',
    'story_rating as storyRating',
    'graphics_rating as graphicsRating',
    'performance_rating as performanceRating',
    'fun_rating as funRating',
    'final_rating as finalRating',
    'final_thoughts as finalThoughts',
    db.raw(
      'gameplay_rating + story_rating + graphics_rating + performance_rating + fun_rating as totalRating',
    ),
  )
}

//get game by ID
export function getGameById(id: number): Promise<Game> {
  return db('gamelog')
    .where({ id })
    .select(
      'id',
      'game',
      'played_before as playedBefore',
      'clocked_before as clockedBefore',
      'platform',
      'start_date as startDate',
      'finish_date as finishDate',
      'playtime_estimate as playtimeEstimate',
      'playtime_final as playtimeFinal',
      'gameplay_rating as gameplayRating',
      'story_rating as storyRating',
      'graphics_rating as graphicsRating',
      'performance_rating as performanceRating',
      'fun_rating as funRating',
      'final_rating as finalRating',
      'final_thoughts as finalThoughts',
    )
    .first()
}

//add a new game
export function addGame(newGame: Game): Promise<Game> {
  return db('gamelog').insert({
    game: newGame.game,
    played_before: newGame.playedBefore,
    clocked_before: newGame.clockedBefore,
    platform: newGame.platform,
    start_date: newGame.startDate,
    finish_date: newGame.finishDate,
    playtime_estimate: newGame.playtimeEstimate,
    playtime_final: newGame.playtimeFinal,
    gameplay_rating: newGame.gameplayRating,
    story_rating: newGame.storyRating,
    graphics_rating: newGame.graphicsRating,
    performance_rating: newGame.performanceRating,
    fun_rating: newGame.funRating,
    final_rating: newGame.finalRating,
    final_thoughts: newGame.finalThoughts,
  })
}

//delete a game
export function deleteGame(id: number) {
  return db('gamelog').where({ id }).delete()
}

//update a game rating
export async function rateGame(
  gameName: string,
  playtimeFinal: string | null,
  gameplayRating: number | null,
  storyRating: number | null,
  graphicsRating: number | null,
  performanceRating: number | null,
  funRating: number | null,
  finalRating: number | null,
  finalThoughts: string | null,
) {
  const game = await db('gamelog').where('game', gameName).first()

  if (!game) {
    throw new Error('Game not found')
  }

  return db('gamelog').where({ id: game.id }).update({
    playtime_final: playtimeFinal,
    gameplay_rating: gameplayRating,
    story_rating: storyRating,
    graphics_rating: graphicsRating,
    performance_rating: performanceRating,
    fun_rating: funRating,
    final_rating: finalRating,
    final_thoughts: finalThoughts,
  })
}
