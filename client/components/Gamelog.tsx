import { useQuery } from '@tanstack/react-query'
import { getGames } from '../apis/gamelogAPI'

function Gamelog() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['gamelog'],
    queryFn: () => getGames(),
  })

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    console.error(error.message)
    return <p>Error...</p>
  }

  console.log('Gamelog component: ', data)
  return (
    <>
      <h1>Here are some games</h1>
      {data.map((gamelog) => (
        <p key={gamelog.id}>
          ID: {gamelog.id} | Name: {gamelog.game} | Platform: {gamelog.platform}{' '}
          | Rating: {gamelog.finalRating} | Reflections: {gamelog.finalThoughts}
        </p>
      ))}
    </>
  )
}

export default Gamelog
