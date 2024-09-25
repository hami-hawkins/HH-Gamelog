import AddGame from './AddGame'
import DeleteGame from './DeleteGame'
import Gamelog from './Gamelog'

function App() {
  return (
    <>
      <header className="header">
        <h1>My Gamelog</h1>
      </header>
      <section className="main">
        <Gamelog />
        <AddGame />
        <DeleteGame />
      </section>
    </>
  )
}

export default App
