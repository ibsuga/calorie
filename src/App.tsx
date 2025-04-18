import './App.css'
import Navbar from './components/Navbar/Navbar'
import background from './assets/food-background.jpg'
import MenuBar from './components/MenuBar/MenuBar'
import DayContent from './components/DayContent/DayContent'

function App() {

  return (
    <div className='App'>

      <div className="app-background" style={{ backgroundImage: `url(${background})` }} />

      <div className='app-content'>

        <Navbar />

        <MenuBar />

        <DayContent />
      </div>

    </div>

  )
}

export default App
