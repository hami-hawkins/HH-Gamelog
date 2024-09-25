import { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import { addNewGame } from '../apis/gamelogAPI'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Game } from '../../models/games'

function AddGame() {
  const [{ game, platform, release_date, owned, clocked }, setFormValues] =
    useState({
      game: '',
      platform: '',
      release_date: '',
      owned: false,
      clocked: false,
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
      platform,
      release_date,
      owned,
      clocked,
    })
  }

  return (
    <>
      <h1>Add a new Game</h1>
      <form className="form" onSubmit={onSubmit} aria-label="Add a Game">
        <div>
          <label htmlFor="game">Game</label>
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
          <label htmlFor="platform">Platform</label>
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
          <label htmlFor="release_date">Release Date</label>
          <input
            className="form_input"
            type="text"
            name="release_date"
            id="release_date"
            value={release_date}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="owned">Owned</label>
          <input
            className="form_input"
            type="checkbox"
            name="owned"
            id="owned"
            checked={owned}
            onChange={onCheckBoxChange}
          />
        </div>
        <div>
          <label htmlFor="clocked">Clocked</label>
          <input
            className="form_input"
            type="checkbox"
            name="clocked"
            id="clocked"
            checked={clocked}
            onChange={onCheckBoxChange}
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
