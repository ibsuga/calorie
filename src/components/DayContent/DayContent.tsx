import './DayContent.css';
import CalorieBar from './CalorieBar/CalorieBar';
import { PiCards } from "react-icons/pi";
import { IoIosList } from "react-icons/io";
import MealDisplay from './MealDisplay/MealDisplay';
import { useCallback, useContext, useMemo, useState } from 'react';
import useFoodStore, { foodType, ingredientType, mealType } from '../../store/FoodStore';
import { DateContext } from '../../App';
import MenuBar from '../MenuBar/MenuBar';

import { PiAvocadoFill } from "react-icons/pi";


export type mealsMacrosTotalsType = {
    "protein": number[],
    "carbohidrates": number[],
    "fats": number[],
    "fibre": number[],
    "salts": number[],
}

export type dayTotalMacrosType = {
    "protein": number,
    "carbohidrates": number,
    "fats": number,
    "fibre": number,
    "salts": number,
}

function DayContent(props: {
    setDateId: (id: string) => void
}) {
    const [isListView, setIsListView] = useState(false);

    const food = useFoodStore((state) => state.food);
    const history = useFoodStore((state) => state.history)
    const calorieLimit = useFoodStore((state) => state.calorieLimit)
    const updateCalorieLimit = useFoodStore((state) => state.updateCalorieLimit)
    const dateId = useContext(DateContext);

    const getMealsStatTotals = useCallback((stat: keyof foodType) => {
        if (dateId && history[dateId]) {
            // Object.keys() builds an array of strings consisting of the keys of the passed object. (["breakfast", "lunch", "dinner", "snacks"])
            const day_meals: mealType[] = Object.keys(history[dateId]) as mealType[];
            // Create an array with the sum of each meal's stats.
            return day_meals.map((meal: mealType) => {
                // Iterate through each ingredient, to get a total sum of stat value for the meal.
                return history[dateId][meal].reduce((prev: number, current: ingredientType) => {
                    var current_food = food.find((f: foodType) => f.id == current.food);
                    if (current_food) {
                        return prev + (Number(current_food[stat]) * (current.grams) / 100) // Epic calculation that can't be wrong
                    } else {
                        return prev;
                    }
                }, 0)
            }, 0)
        } else {
            return [0, 0, 0, 0]
        }
    }, [dateId, history])

    // meal stats stores in an array the sum of each meal's stats Ex. [200, 300, 100, 200]
    // these are ordered by default meal order (breakfast, lunch, dinner, snacks)
    const meals_calorie_totals = useMemo(() => { return getMealsStatTotals('calories') }, [history, dateId]);

    const meals_macros_totals = useMemo(() => {
        return {
            "protein": getMealsStatTotals('protein'),
            "carbohidrates": getMealsStatTotals('carbohidrates'),
            "fats": getMealsStatTotals('fats'),
            "fibre": getMealsStatTotals('fibre'),
            "salts": getMealsStatTotals('salts'),
        }
    }, [dateId, history]);

    // With a reducer, sum up all calories stored in meal_calories array. :D
    const day_total_calories = useMemo(() => meals_calorie_totals.reduce((prev: number, current: number) => prev + current, 0), [meals_calorie_totals]);

    const day_total_macros = useMemo(() => {
        return {
            "protein": meals_macros_totals.protein.reduce((prev: number, current: number) => prev + current, 0),
            "carbohidrates": meals_macros_totals.carbohidrates.reduce((prev: number, current: number) => prev + current, 0),
            "fats": meals_macros_totals.fats.reduce((prev: number, current: number) => prev + current, 0),
            "fibre": meals_macros_totals.fibre.reduce((prev: number, current: number) => prev + current, 0),
            "salts": meals_macros_totals.salts.reduce((prev: number, current: number) => prev + current, 0),
        }
    }, [meals_macros_totals]);

    return (
        <div className="DayContent">

            <div className="DayContent-header">

                <MenuBar
                    setDateId={props.setDateId}
                    mealCalories={meals_calorie_totals}
                    dayTotalCalories={day_total_calories}
                    dayTotalMacros={day_total_macros}
                    calorieLimit={calorieLimit} />

                <div className="max-calories">
                    <input type="tel" value={calorieLimit} onChange={(e) => updateCalorieLimit(Number(e.target.value))} />
                    <span>CALORIE LIMIT</span>
                    <PiAvocadoFill />
                    <div className="decoration" />
                </div>

            </div>

            <div className="food-display">

                <MealDisplay
                    meal="breakfast"
                    mealIndex={0}
                    calorieCount={meals_calorie_totals}
                    mealsMacrosCount={meals_macros_totals}
                    isListView={isListView}
                />
                <MealDisplay
                    meal="lunch"
                    mealIndex={1}
                    calorieCount={meals_calorie_totals}
                    mealsMacrosCount={meals_macros_totals}
                    isListView={isListView}
                />
                <MealDisplay
                    meal="dinner"
                    mealIndex={2}
                    calorieCount={meals_calorie_totals}
                    mealsMacrosCount={meals_macros_totals}
                    isListView={isListView}
                />
                <MealDisplay
                    meal="snacks"
                    mealIndex={3}
                    calorieCount={meals_calorie_totals}
                    mealsMacrosCount={meals_macros_totals}
                    isListView={isListView}
                />

            </div>
        </div >
    )
}

export default DayContent;