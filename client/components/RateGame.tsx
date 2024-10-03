import { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import { rateGame } from '../apis/gamelogAPI'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function RateGame() {
  const initialFormValues = {
    game: '',
    playtimeFinal: '',
    gameplayRating: 0,
    storyRating: 0,
    graphicsRating: 0,
    performanceRating: 0,
    funRating: 0,
    finalRating: 0,
    finalThoughts: '',
  }

  const [formValues, setFormValues] = useState(initialFormValues)

  const queryClient = useQueryClient()

  const rateGameMutation = useMutation({
    mutationFn: async () =>
      rateGame(
        formValues.game,
        formValues.playtimeFinal,
        formValues.gameplayRating,
        formValues.storyRating,
        formValues.graphicsRating,
        formValues.performanceRating,
        formValues.funRating,
        formValues.finalRating,
        formValues.finalThoughts,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gamelog'] })
      setFormValues(initialFormValues)
    },
  })

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = evt.currentTarget
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    await rateGameMutation.mutate()
  }

  return (
    <div>
      <h1 className="subheading">Rate a Game</h1>
      <hr className="mini-separator" />
      <form onSubmit={handleSubmit}>
        <div className="center label-spacing">
          <label htmlFor="game">Game Name: </label>
          <br />
          <input
            type="text"
            name="game"
            id="game"
            value={formValues.game}
            onChange={handleChange}
          />
        </div>
        <div className="center label-spacing">
          <label htmlFor="playtimeFinal">Playtime (Final): </label>
          <br />
          <input
            type="text"
            name="playtimeFinal"
            id="playtimeFinal"
            value={formValues.playtimeFinal}
            onChange={handleChange}
          />
        </div>
        <div className="center label-spacing">
          <label htmlFor="gameplayRating">Gameplay / 10: </label>
          <br />
          <input
            type="number"
            name="gameplayRating"
            id="gameplayRating"
            value={formValues.gameplayRating}
            onChange={handleChange}
            min="0"
            max="10"
          />
        </div>
        <div className="center label-spacing">
          <label htmlFor="storyRating">Story / 10: </label>
          <br />
          <input
            type="number"
            name="storyRating"
            id="storyRating"
            value={formValues.storyRating}
            onChange={handleChange}
            min="0"
            max="10"
          />
        </div>
        <div className="center label-spacing">
          <label htmlFor="graphicsRating">Graphics / 10: </label>
          <br />
          <input
            type="number"
            name="graphicsRating"
            id="graphicsRating"
            value={formValues.graphicsRating}
            onChange={handleChange}
            min="0"
            max="10"
          />
        </div>
        <div className="center label-spacing">
          <label htmlFor="performanceRating">Performance / 10: </label>
          <br />
          <input
            type="number"
            name="performanceRating"
            id="performanceRating"
            value={formValues.performanceRating}
            onChange={handleChange}
            min="0"
            max="10"
          />
        </div>
        <div className="center label-spacing">
          <label htmlFor="funRating">Fun / 10: </label>
          <br />
          <input
            type="number"
            name="funRating"
            id="funRating"
            value={formValues.funRating}
            onChange={handleChange}
            min="0"
            max="10"
          />
        </div>
        <div className="center label-spacing">
          <label htmlFor="finalRating">Final Rating / 5: </label>
          <br />
          <input
            type="number"
            name="finalRating"
            id="finalRating"
            value={formValues.finalRating}
            onChange={handleChange}
            min="0"
            max="5"
          />
        </div>
        <div className="center label-spacing">
          <label htmlFor="finalThoughts">Reflections: </label>
          <br />
          <input
            type="text"
            name="finalThoughts"
            id="finalThoughts"
            value={formValues.finalThoughts}
            onChange={handleChange}
          />
        </div>
        <div className="center label-spacing">
          <button type="submit">Submit rating</button>
        </div>
      </form>
    </div>
  )
}

export default RateGame
