import useFoodStore from "../../../store/FoodStore";
import AddFoodDialog from "../../AddFoodDialog/AddFoodDialog";

import { DateContext } from "../../../App";
import { useContext, useMemo } from "react";
import { mealType } from "../../../store/FoodStore";
import FoodCard from "../FoodCard/FoodCard";


function MealDisplay(props: {
    meal: mealType,
    isListView: boolean,
}) {
    const food = useFoodStore((state) => state.food)
    const history = useFoodStore((state) => state.history)
    const dateId = useContext(DateContext);

    const food_list = useMemo(() => {
        if (dateId && history[dateId]) {
            return history[dateId][props.meal].map((food_id: number) => {
                const food_item = food.find((f) => f.id === food_id)
                if (food_item) {
                    return <FoodCard
                        key={food_id}
                        id={food_id}
                        meal={props.meal}
                        name={food_item.name}
                        calories={food_item.calories}
                        isListView={props.isListView}

                    />
                }
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