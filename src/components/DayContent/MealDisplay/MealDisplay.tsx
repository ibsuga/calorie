import useFoodStore, { ingredientType } from "../../../store/FoodStore";
import AddFoodDialog from "../../AddFoodDialog/AddFoodDialog";

import { DateContext } from "../../../App";
import { useContext, useMemo } from "react";
import { mealType } from "../../../store/FoodStore";
import FoodCard from "../FoodCard/FoodCard";


function MealDisplay(props: {
    meal: mealType,
    isListView: boolean,
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
            <AddFoodDialog title={props.meal} meal={props.meal} />
            <div className='food'>
                {food_list}
            </div>
        </div>
    )

}

export default MealDisplay;