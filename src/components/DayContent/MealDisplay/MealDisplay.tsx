import './MealDisplay.css';
import useFoodStore, { ingredientType } from "../../../store/FoodStore";
import AddFoodDialog from "../../AddFoodDialog/AddFoodDialog";
import { RiDeleteBinLine } from "react-icons/ri";

import { DateContext } from "../../../App";
import { useContext, useMemo, useState } from "react";
import { mealType } from "../../../store/FoodStore";
import FoodCard from "../FoodCard/FoodCard";
import { mealsMacrosTotalsType } from '../DayContent';



function MealDisplay(props: {
    meal: mealType,
    mealIndex: number,
    calorieCount: number[],
    mealsMacrosCount: mealsMacrosTotalsType,
}) {
    const [deleteMode, setDeleteMode] = useState(false);
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
                    deleteMode={deleteMode}
                />
            })
        } else {
            return <span>NO DATE SELECTED</span>
        }
    }, [dateId, history, deleteMode])


    console.log(deleteMode)

    return (
        <div className='MealDisplay'>

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

                <button className={`delete-food-button ${deleteMode ? 'active' : ''}`} onClick={() => setDeleteMode(!deleteMode)}> <RiDeleteBinLine /></button>

                <AddFoodDialog meal={props.meal} />
            </div>

            <div className='food'>
                {food_list}
            </div>
        </div>
    )

}

export default MealDisplay;