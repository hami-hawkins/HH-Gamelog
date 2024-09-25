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

//Update a game as owned
//UPDATE '/api/v1/gamelog/owned/:id'
router.patch('/owned/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await db.ownedGame(id)
    res.sendStatus(201)
  } catch (error) {
    console.error('Could not update game: ', error)
    res.status(500)
  }
})

//Update a game as sold (no longer owned)
//UPDATE '/api/v1/gamelog/sold/:id'
router.patch('/sold/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    await db.soldGame(id)
    res.sendStatus(201)
  } catch (error) {
    console.error('Could not update game: ', error)
    res.status(500)
  }
})

export default router
