import './DayContent.css';
import CalorieBar from './CalorieBar/CalorieBar';
import { PiCards } from "react-icons/pi";
import { IoIosList } from "react-icons/io";
import MealDisplay from './MealDisplay/MealDisplay';
import { useState } from 'react';


function DayContent() {

    const [isListView, setIsListView] = useState(false);

    return (
        <div className="DayContent">

            <div className="filter-bar">

                <div className="filter-meals">
                    <button>Breakfast</button>
                    <button>Lunch</button>
                    <button>Dinner</button>
                    <button>Snacks</button>
                    <button>All</button>
                </div>

                <div className="view-mode">
                    <button onClick={() => setIsListView(false)}> <PiCards /> </button>
                    <button onClick={() => setIsListView(true)}><IoIosList /> </button>
                </div>

            </div>

            <CalorieBar
                max_value={1500}
                valueBreakfast={500}
                valueLunch={100}
                valueDinner={534}
                valueSnacks={300}
            />


            <div className="food-display">

                <MealDisplay meal="breakfast" isListView={isListView} />

                <MealDisplay meal="lunch" isListView={isListView} />

                <MealDisplay meal="dinner" isListView={isListView} />

                <MealDisplay meal="snacks" isListView={isListView} />

            </div>
        </div>
    )
}

export default DayContent;