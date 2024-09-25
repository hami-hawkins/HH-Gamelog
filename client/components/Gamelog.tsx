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
        <div key={gamelog.id}>
          <div>
            <h2>{gamelog.game}</h2>
            <h4>GameID:</h4> <p>{gamelog.id}</p>
            <h4>Played on:</h4> <p>{gamelog.platform}</p>
          </div>
          <div>
            <h4>Previously played: </h4>{' '}
            <p>{gamelog.playedBefore ? 'Yes' : 'No'}</p>
            <h4>Previously clocked: </h4>{' '}
            <p>{gamelog.clockedBefore ? 'Yes' : 'No'}</p>
            <table border="1">
              <thead>
                <tr>
                  <th>Start Date</th>
                  <th>Finish Date</th>
                </tr>
              </thead>
              <tr>
                <td>{gamelog.startDate}</td>
                <td>{gamelog.finishDate}</td>
              </tr>
            </table>
            <table border="1">
              <thead>
                <tr>
                  <th>Estimated Playtime</th>
                  <th>Actual Playtime</th>
                </tr>
                <tr>
                  <td>{gamelog.playtimeEstimate}</td>
                  <td>{gamelog.playtimeFinal}</td>
                </tr>
              </thead>
            </table>
          </div>
          <div>
            <h3>Review:</h3>
            <table border="1">
              <thead>
                <tr>
                  <th>Gameplay</th>
                  <th>Story</th>
                  <th>Graphics</th>
                  <th>Performance</th>
                  <th>Fun</th>
                  <th>TOTAL</th>
                </tr>
                <tr>
                  <td>{gamelog.gameplayRating}</td>
                  <td>{gamelog.storyRating}</td>
                  <td>{gamelog.graphicsRating}</td>
                  <td>{gamelog.performanceRating}</td>
                  <td>{gamelog.funRating}</td>
                  <td>Yet to implement</td>
                </tr>
              </thead>
            </table>
            <h4>Reflections: </h4> <p>{gamelog.finalThoughts}</p>
            <h4>Star Rating: </h4> <p>{gamelog.finalRating}</p>
          </div>
        </div>
      ))}
      <hr />
    </>
  )
}

export default Gamelog
