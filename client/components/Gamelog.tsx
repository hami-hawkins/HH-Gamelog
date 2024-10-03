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
          <div className="game-info-container">
            <h2 className="game-title">{gamelog.game}</h2>
            <div className="game-details">
              <div className="base-info">
                <table>
                  <thead>
                    <tr>
                      <th>Game ID</th>
                      <th>Platform</th>
                      <th>Played Before</th>
                      <th>Clocked Before</th>
                      <th>Start Date</th>
                      <th>Finish Date</th>
                      <th>Estimated Playtime</th>
                      <th>Actual Playtime</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{gamelog.id}</td>
                      <td>{gamelog.platform}</td>
                      <td>{gamelog.playedBefore ? 'Yes' : 'No'}</td>
                      <td>{gamelog.clockedBefore ? 'Yes' : 'No'}</td>
                      <td>{gamelog.startDate}</td>
                      <td>{gamelog.finishDate}</td>
                      <td>{gamelog.playtimeEstimate}</td>
                      <td>{gamelog.playtimeFinal}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div>
            <hr className="mini-separator" />
            <h3 className="center">Review:</h3>
            <div className="table-container">
              <table className="centered-table">
                <thead>
                  <tr>
                    <th>Gameplay</th>
                    <th>Story</th>
                    <th>Graphics</th>
                    <th>Performance</th>
                    <th>Fun</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{gamelog.gameplayRating}</td>
                    <td>{gamelog.storyRating}</td>
                    <td>{gamelog.graphicsRating}</td>
                    <td>{gamelog.performanceRating}</td>
                    <td>{gamelog.funRating}</td>
                    <td>{gamelog.totalRating}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr className="mini-separator" />
            <h3 className="spacing">Reflections: </h3>{' '}
            <p className="reflection">{gamelog.finalThoughts}</p>
            <hr className="mini-separator" />
            <h3 className="spacing">Star Rating: </h3>{' '}
            <p className="spacing">{gamelog.finalRating} / 5</p>
          </div>
          <hr className="separator" />
        </div>
      ))}
    </>
  )
}

export default Gamelog
