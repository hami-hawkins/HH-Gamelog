import AddGame from './AddGame'
import DeleteGame from './DeleteGame'
import Gamelog from './Gamelog'
import RateGame from './RateGame'

function App() {
  return (
    <div>
      <header className="header">
        <h1>My Gamelog</h1>
      </header>
      <section className="main">
        <Gamelog />
        <AddGame />
        <RateGame />
        <DeleteGame />
      </section>
    </div>
  )
}

export default App
