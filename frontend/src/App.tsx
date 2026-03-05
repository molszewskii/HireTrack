import './App.css'
import Dashboard from './components/Dashboard'

function App() {
  return(
    <div className='container'>
        <nav>
          <h1 className='text-5xl font-bold'>HireTrack</h1>
        </nav>
        <main>
          <Dashboard/>
        </main>
    </div>
  )
}

export default App
