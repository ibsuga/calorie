import CalorieBar from './CalorieBar/CalorieBar';
import './DayContent.css';
import { PiCards } from "react-icons/pi";
import { IoIosList } from "react-icons/io";
import FoodCard from './FoodCard/FoodCard';
import FoodList from './FoodList/FoodList';

function DayContent() {
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
                    <button> <PiCards /> </button>
                    <button><IoIosList /></button>
                </div>

            </div>

            <CalorieBar
                max_value={1500}
                valueBreakfast={500}
                valueLunch={100}
                valueDinner={50}
                valueSnacks={300}
            />


            <div className="food-display">

                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />

                <FoodList />


            </div>
        </div>
    )
}

export default DayContent;