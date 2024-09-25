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

//update a games ratings
export async function rateGame(
  id: number,
  playtimeFinal: string | null,
  gameplayRating: number,
  storyRating: number,
  graphicsRating: number,
  performanceRating: number,
  funRating: number,
  finalRating: number,
  finalThoughts: string | null,
) {
  await request.patch(`/api/v1/gamelog/rate/${id}`).send({
    playtimeFinal,
    gameplayRating,
    storyRating,
    graphicsRating,
    performanceRating,
    funRating,
    finalRating,
    finalThoughts,
  })
  return
}
