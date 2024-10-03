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
        <hr className="separator" />
        <Gamelog />
        <hr className="separator" />
        <AddGame />
        <hr className="separator" />
        <RateGame />
        <hr className="separator" />
        <DeleteGame />
        <hr className="separator" />
      </section>
    </div>
  )
}

export default App
