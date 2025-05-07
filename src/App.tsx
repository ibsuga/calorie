import './App.css'
import Navbar from './components/Navbar/Navbar'
import background from './assets/food-background.jpg'
import MenuBar from './components/MenuBar/MenuBar'
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

          <MenuBar setDateId={setDateId} />

          <DayContent />
        </div>
      </DateContext.Provider>

    </div>

  )
}

export default App
