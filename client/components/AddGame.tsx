import { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import { addNewGame } from '../apis/gamelogAPI'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Game } from '../../models/games'

function AddGame() {
  const [
    {
      game,
      playedBefore,
      clockedBefore,
      platform,
      startDate,
      playtimeEstimate,
    },
    setFormValues,
  ] = useState({
    game: '',
    playedBefore: false,
    clockedBefore: false,
    platform: '',
    startDate: '',
    playtimeEstimate: '',
  })

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: async (newGame: Game) => addNewGame(newGame),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gamelog'] })
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
      game,
      playedBefore,
      clockedBefore,
      platform,
      startDate,
      finishDate: null,
      playtimeEstimate,
      playtimeFinal: null,
      gameplayRating: null,
      storyRating: null,
      graphicsRating: null,
      performanceRating: null,
      funRating: null,
      finalRating: null,
      finalThoughts: null,
    })
  }

  return (
    <>
      <h1>Add a new Game</h1>
      <form className="form" onSubmit={onSubmit} aria-label="Add a Game">
        <div>
          <label htmlFor="game">Game: </label>
          <input
            className="form_input"
            type="text"
            name="game"
            id="game"
            value={game}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="played_before">Played before? </label>
          <input
            className="form_input"
            type="checkbox"
            name="played_before"
            id="played_before"
            checked={playedBefore}
            onChange={onCheckBoxChange}
          />
        </div>
        <div>
          <label htmlFor="clocked_before">Clocked before? </label>
          <input
            className="form_input"
            type="checkbox"
            name="clocked_before"
            id="clocked_before"
            checked={clockedBefore}
            onChange={onCheckBoxChange}
          />
        </div>
        <div>
          <label htmlFor="platform">Platform: </label>
          <input
            className="form_input"
            type="text"
            name="platform"
            id="platform"
            value={platform}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="start_date">Start Date: </label>
          <input
            className="form_input"
            type="text"
            name="startDate"
            id="start_date"
            value={startDate}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="playtime_estimate">Estimated Playtime:</label>
          <input
            className="form_input"
            type="text"
            name="playtimeEstimate"
            id="playtime_estimate"
            value={playtimeEstimate}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="button-primary">
          Add Game
        </button>
      </form>
    </>
  )
}

export default AddGame
