import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteGame } from '../apis/gamelogAPI'

function DeleteGame() {
  const [gameId, setGameId] = useState<number | ''>('')

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => deleteGame(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gamelog'] })
    },
  })

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const id = evt.target.value ? Number(evt.target.value) : ''
    setGameId(id)
  }

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (typeof gameId === 'number') {
      await deleteMutation.mutate(gameId)
    }
  }

  return (
    <>
      <h1 className="subheading">Delete a Game</h1>
      <hr className="mini-separator" />
      <form className="form" onSubmit={onSubmit} aria-label="Delete a Game">
        <div className="center label-spacing">
          <label htmlFor="gameId">Game ID</label>
          <br />
          <input
            className="form_input"
            type="number"
            name="gameId"
            id="gameId"
            value={gameId || ''}
            onChange={onChange}
          />
        </div>
        <div className="center label-spacing">
          <button type="submit" className="button-primary">
            Delete Game
          </button>
        </div>
      </form>
    </>
  )
}

export default DeleteGame
