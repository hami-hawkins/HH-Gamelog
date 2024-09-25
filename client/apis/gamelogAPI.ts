import request from 'superagent'
import { Game } from '../../models/games'

//get all games
export async function getGames(): Promise<Game[]> {
  const result = await request.get('/api/v1/gamelog')
  return result.body as Game[]
}

//get game by id
export async function getGameById(id: number): Promise<Game> {
  const result = await request.get(`/api/v1/gamelog/${id}`)
  return result.body as Game
}

//add a game
export async function addNewGame(newGame: Game) {
  await request.post('/api/v1/gamelog/').send(newGame)
  return
}

//delete a game
export async function deleteGame(id: number) {
  await request.delete(`/api/v1/gamelog/${id}`)
  return
}

//update a game as owned
export async function ownedGame(id: number) {
  await request.patch(`/api/v1/gamelog/owned/${id}`)
}

//update a game as sold (no longer owned)
export async function soldGame(id: number) {
  await request.patch(`/api/v1/gamelog/sold/${id}`)
}
