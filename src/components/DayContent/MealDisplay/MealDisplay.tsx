import './MealDisplay.css';
import useFoodStore, { ingredientType } from "../../../store/FoodStore";
import AddFoodDialog from "../../AddFoodDialog/AddFoodDialog";

import { DateContext } from "../../../App";
import { useContext, useMemo } from "react";
import { mealType } from "../../../store/FoodStore";
import FoodCard from "../FoodCard/FoodCard";
import { dayTotalMacrosType, mealsMacrosTotalsType } from '../DayContent';



function MealDisplay(props: {
    meal: mealType,
    mealIndex: number,
    isListView: boolean,
    calorieCount: number[],
    mealsMacrosCount: mealsMacrosTotalsType,
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

                <div className="macros-count">
                    <span>{props.mealsMacrosCount.protein[props.mealIndex]}</span>
                    <span>protein</span>

                    <span>{props.mealsMacrosCount.carbohidrates[props.mealIndex]}</span>
                    <span>carbs</span>

                    <span>{props.mealsMacrosCount.fats[props.mealIndex]}</span>
                    <span>fats</span>

                    <span>{props.mealsMacrosCount.fibre[props.mealIndex]}</span>
                    <span>fibre</span>

                    <span>{props.mealsMacrosCount.salts[props.mealIndex]}</span>
                    <span>salts</span>

                </div>

                <div className='calorie-count'>
                    <span className='value'>{props.calorieCount[props.mealIndex]}</span>
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