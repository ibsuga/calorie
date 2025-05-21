import './App.css'
import Navbar from './components/Navbar/Navbar'
import background from './assets/food-background.jpg'
import DayContent from './components/DayContent/DayContent'
import { createContext, useEffect, useState } from 'react'
import useFoodStore from './store/FoodStore'
import { getIdFromDate } from './store/FoodStore'


export const DateContext = createContext<string | null>(null);


function App() {
  const [dateId, setDateId] = useState<string | null>(getIdFromDate(new Date()));
  const createHistory = useFoodStore((state) => state.createHistory);

  useEffect(() => {
    if (dateId) createHistory(dateId)
  }, [dateId])

  return (
    <div className='App'>

      <div className="app-background" style={{ backgroundImage: `url(${background})` }} />

      <DateContext.Provider value={dateId}>
        <div className='app-content'>

          <Navbar />

          <span className="flavor-text">Eat healthy!</span>

          <DayContent setDateId={setDateId} />

        </div>
      </DateContext.Provider>

    </div>

  )
}

export default App
