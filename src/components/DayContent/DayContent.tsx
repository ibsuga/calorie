import './DayContent.css';
import CalorieBar from './CalorieBar/CalorieBar';
import { PiCards } from "react-icons/pi";
import { IoIosList } from "react-icons/io";
import MealDisplay from './MealDisplay/MealDisplay';
import { useContext, useMemo, useState } from 'react';
import useFoodStore, { foodType, ingredientType, mealType } from '../../store/FoodStore';
import { DateContext } from '../../App';
import MenuBar from '../MenuBar/MenuBar';

import { PiAvocadoFill } from "react-icons/pi";


function DayContent(props: {
    setDateId: (id: string) => void
}) {

    const [isListView, setIsListView] = useState(false);

    const food = useFoodStore((state) => state.food);
    const history = useFoodStore((state) => state.history)
    const calorieLimit = useFoodStore((state) => state.calorieLimit)
    const updateCalorieLimit = useFoodStore((state) => state.updateCalorieLimit)
    const dateId = useContext(DateContext);


    // meal calories stores in an array the sum of each meal's calories Ex. [200, 300, 100, 200]
    // these are ordered by default meal order (breakfast, lunch, dinner, snacks)
    const meal_calories = useMemo(() => {
        if (dateId && history[dateId]) {
            // Object.keys() builds an array of strings consisting of the keys of the passed object. (["breakfast", "lunch", "dinner", "snacks"])
            const day_meals: mealType[] = Object.keys(history[dateId]) as mealType[];
            // Create an array with the sum of each meal's calories.
            return day_meals.map((meal: mealType) => {
                // Iterate through each ingredient, to get a total sum of calories for the meal.
                return history[dateId][meal].reduce((prev: number, current: ingredientType) => {
                    var current_food = food.find((f: foodType) => f.id == current.food);
                    if (current_food) {
                        return prev + (current_food.calories * (current.grams) / 100) // Epic calculation that can't be wrong
                    } else {
                        return prev;
                    }
                }, 0)
            }, 0)
        } else {
            return [0, 0, 0, 0]
        }
    }, [history, dateId])

    // With a reducer, sum up all calories stored in meal_calories array. :D
    const total_calories = meal_calories.reduce((prev: number, current: number) => prev + current, 0)


    return (
        <div className="DayContent">

            <div className="DayContent-header">
                <MenuBar setDateId={props.setDateId} mealCalories={meal_calories} totalCalories={total_calories} calorieLimit={calorieLimit} />

                <div className="max-calories">
                    <input type="tel" value={calorieLimit} onChange={(e) => updateCalorieLimit(Number(e.target.value))} />
                    <span>CALORIE LIMIT</span>
                    <PiAvocadoFill />
                    <div className="decoration" />
                </div>
            </div>

            {/* <div className="filter-bar"> */}

            {/* <div className="filter-meals">
                    <button>Breakfast</button>
                    <button>Lunch</button>
                    <button>Dinner</button>
                    <button>Snacks</button>
                    <button>All</button>
                </div> */}

            {/* <div className="view-mode">
                    <button onClick={() => setIsListView(false)}> <PiCards /> </button>
                    <button onClick={() => setIsListView(true)}><IoIosList /> </button>
                </div> */}

            {/* </div> */}



            <div className="food-display">

                <MealDisplay meal="breakfast" calorieCount={meal_calories[0]} isListView={isListView} />

                <MealDisplay meal="lunch" calorieCount={meal_calories[1]} isListView={isListView} />

                <MealDisplay meal="dinner" calorieCount={meal_calories[2]} isListView={isListView} />

                <MealDisplay meal="snacks" calorieCount={meal_calories[3]} isListView={isListView} />

            </div>
        </div >
    )
}

export default DayContent;