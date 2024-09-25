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
  return db('gamelog').insert(newGame)
}

//delete a game
export function deleteGame(id: number) {
  return db('gamelog').where({ id }).delete()
}

//update a game as owned
export function ownedGame(id: number) {
  return db('gamelog').where({ id }).update('owned', true)
}

//update a game when sold (no longer owned)
export function soldGame(id: number) {
  return db('gamelog').where({ id }).update('owned', false)
}
