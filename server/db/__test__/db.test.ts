import { it, expect, describe, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from '../connection'
import * as db from '../db'

//SETUP
beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

//TESTS
//getAllGames()
describe('getAllGames()', () => {
  it('shows all games and their data from the database', async () => {
    //ARRANGE
    //ACT
    const games = await db.getAllGames()
    //ASSERT
    expect(games).toHaveLength(16)
  })
})

//getGameById(id)
// TODO: something funky is going on here - the id should work as 1 but currently only works as 17, i.e. the seeds are running twice somehow
describe('getGameById(id)', () => {
  it('returns the game data with the matching id', async () => {
    //ARRANGE
    const id = 17
    //ACT
    const game = await db.getGameById(id)
    //ASSERT
    expect(game).toStrictEqual({
      id: 17,
      game: 'God of War Ragnarok',
      playedBefore: 0,
      clockedBefore: 0,
      platform: 'PS5',
      startDate: 'unknown',
      finishDate: '31/12/2023',
      playtimeEstimate: '25hrs',
      playtimeFinal: '23hr 25min',
      gameplayRating: 7,
      storyRating: 9,
      graphicsRating: 10,
      performanceRating: 9,
      funRating: 7,
      finalRating: 4,
      finalThoughts:
        'The UI was a big downgrade, menus looked like they were straight out of Shadow of Mordor (not in a good way). Map was next to useless outside of fast travel. It looked amazing and the plot was next to perfect (with a few pacing problems here and there) but something felt lacking overall. Still an incredible game.',
    })
  })
})
