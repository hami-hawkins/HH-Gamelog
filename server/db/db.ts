import connection from './connection'
import { Game } from '../../models/games'

const db = connection

//get all games
export function getAllGames(): Promise<Game[]> {
  return db('gamelog').select(
    'id',
    'game',
    'platform',
    'release_date as releaseDate',
    'owned',
    'clocked',
  )
}

//get game by ID
export function getGameById(id: number): Promise<Game> {
  return db('gamelog')
    .where({ id })
    .select(
      'id',
      'game',
      'platform',
      'release_date as releaseDate',
      'owned',
      'clocked',
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
