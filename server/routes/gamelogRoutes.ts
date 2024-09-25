import Router from 'express'
import * as db from '../db/db'

const router = Router()

//Get all games
//GET '/api/v1/gamelog/'
router.get('/', async (req, res) => {
  try {
    const games = await db.getAllGames()
    res.json(games).status(200)
  } catch (error) {
    console.error('Could not fetch games: ', error)
    res.status(500)
  }
})

//Get game by ID
//GET '/api/v1/gamelog/:id'
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const game = await db.getGameById(id)
    res.json(game).status(200)
  } catch (error) {
    console.error('Could not find game: ', error)
    res.status(500)
  }
})

//Add a new game
//POST '/api/v1/gamelog/'
router.post('/', async (req, res) => {
  const newGame = req.body
  try {
    await db.addGame(newGame)
    res.sendStatus(201)
  } catch (error) {
    console.error('Could not add game', error)
    res.status(500)
  }
})

//Delete a game
//DELETE '/api/v1/gamelog/:id'
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await db.deleteGame(id)
    res.sendStatus(201)
  } catch (error) {
    console.error('Could not delete game: ', error)
    res.status(500)
  }
})

//Update a game rating
//UPDATE '/api/v1/gamelog/:id'
router.patch('/rate', async (req, res) => {
  const {
    gameName,
    playtimeFinal,
    gameplayRating,
    storyRating,
    graphicsRating,
    performanceRating,
    funRating,
    finalRating,
    finalThoughts,
  } = req.body

  // Validate ratings
  if (
    (gameplayRating !== null && (gameplayRating < 0 || gameplayRating > 10)) ||
    (storyRating !== null && (storyRating < 0 || storyRating > 10)) ||
    (graphicsRating !== null && (graphicsRating < 0 || graphicsRating > 10)) ||
    (performanceRating !== null &&
      (performanceRating < 0 || performanceRating > 10)) ||
    (funRating !== null && (funRating < 0 || funRating > 10)) ||
    (finalRating !== null && (finalRating < 0 || finalRating > 5))
  ) {
    return res.status(400).json({ message: 'Invalid rating' })
  }

  try {
    await db.rateGame(
      gameName,
      playtimeFinal,
      gameplayRating,
      storyRating,
      graphicsRating,
      performanceRating,
      funRating,
      finalRating,
      finalThoughts,
    )
    res.sendStatus(201)
  } catch (error) {
    console.error('Could not update game ratings: ', error)
    res.status(500).json({ message: 'Failed to update game rating' })
  }
})

export default router
