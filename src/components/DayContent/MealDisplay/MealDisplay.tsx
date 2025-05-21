import './MealDisplay.css';
import useFoodStore, { ingredientType } from "../../../store/FoodStore";
import AddFoodDialog from "../../AddFoodDialog/AddFoodDialog";

import { DateContext } from "../../../App";
import { useContext, useMemo } from "react";
import { mealType } from "../../../store/FoodStore";
import FoodCard from "../FoodCard/FoodCard";



function MealDisplay(props: {
    meal: mealType,
    isListView: boolean,
    calorieCount: number,
}) {
    const history = useFoodStore((state) => state.history)
    const dateId = useContext(DateContext);

    const food_list = useMemo(() => {
        if (dateId && history[dateId]) {
            return history[dateId][props.meal].map((ingredient: ingredientType, index: number) => {
                return <FoodCard
                    key={index}
                    food={ingredient.food}
                    grams={ingredient.grams}
                    meal={props.meal}
                    isListView={props.isListView}
                />
            })
        } else {
            return <span>NO DATE SELECTED</span>
        }
    }, [dateId, history, props.isListView])

    return (
        <div className="MealDisplay">

            <div className='header'>
                <span className='title'>{props.meal}</span>

                <div className='calorie-count'>
                    <span className='value'>{props.calorieCount}</span>
                    <span>kcal</span>
                </div>

                <AddFoodDialog meal={props.meal} />
            </div>




            <div className='food'>
                {food_list}
            </div>
        </div>
    )

}

export default MealDisplay;