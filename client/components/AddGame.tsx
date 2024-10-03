import { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import { addNewGame } from '../apis/gamelogAPI'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Game } from '../../models/games'

function AddGame() {
  const initialFormValues = {
    game: '',
    playedBefore: false,
    clockedBefore: false,
    platform: '',
    startDate: '',
    playtimeEstimate: '',
  }

  const [formValues, setFormValues] = useState(initialFormValues)

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: async (newGame: Game) => addNewGame(newGame),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gamelog'] })
      setFormValues(initialFormValues)
    },
  })

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget
    setFormValues((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const onCheckBoxChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = evt.currentTarget
    setFormValues((previous) => ({
      ...previous,
      [name]: checked,
    }))
  }

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    await addMutation.mutate({
      game: formValues.game,
      playedBefore: formValues.playedBefore,
      clockedBefore: formValues.clockedBefore,
      platform: formValues.platform,
      startDate: formValues.startDate,
      finishDate: null,
      playtimeEstimate: formValues.playtimeEstimate,
      playtimeFinal: null,
      gameplayRating: null,
      storyRating: null,
      graphicsRating: null,
      performanceRating: null,
      funRating: null,
      finalRating: null,
      finalThoughts: null,
      totalRating: null,
    })
  }

  return (
    <>
      <h1 className="subheading">Add a Game</h1>
      <hr className="mini-separator" />
      <form className="form" onSubmit={onSubmit} aria-label="Add a Game">
        <div className="center label-spacing">
          <label htmlFor="game">Game: </label>
          <br />
          <input
            className="form_input"
            type="text"
            name="game"
            id="game"
            value={formValues.game}
            onChange={onChange}
          />
          <div className="center label-spacing">
            <label htmlFor="platform">Platform: </label>
            <br />
            <input
              className="form_input"
              type="text"
              name="platform"
              id="platform"
              value={formValues.platform}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="center label-spacing">
          <label htmlFor="played_before">Played before? </label>
          <input
            className="form_input"
            type="checkbox"
            name="playedBefore"
            id="played_before"
            checked={formValues.playedBefore}
            onChange={onCheckBoxChange}
          />
        </div>
        <div className="center label-spacing">
          <label htmlFor="clocked_before">Clocked before? </label>
          <input
            className="form_input"
            type="checkbox"
            name="clockedBefore"
            id="clocked_before"
            checked={formValues.clockedBefore}
            onChange={onCheckBoxChange}
          />
        </div>
        <div className="center label-spacing">
          <label htmlFor="start_date">Start Date: </label>
          <br />
          <input
            className="form_input"
            type="text"
            name="startDate"
            id="start_date"
            value={formValues.startDate}
            onChange={onChange}
          />
        </div>
        <div className="center label-spacing">
          <label htmlFor="playtime_estimate">Estimated Playtime:</label>
          <br />
          <input
            className="form_input"
            type="text"
            name="playtimeEstimate"
            id="playtime_estimate"
            value={formValues.playtimeEstimate}
            onChange={onChange}
          />
        </div>
        <div className="center label-spacing">
          <button type="submit">Add Game</button>
        </div>
      </form>
    </>
  )
}

export default AddGame
