import { useContext, useState } from 'react';
import './AddFoodDialog.css';
import { Dialog } from 'primereact/dialog';
import useFoodStore, { foodType, ingredientType } from '../../store/FoodStore';
import LibraryItem from '../DayContent/LibraryItem/LibraryItem';
import { mealType } from '../../store/FoodStore';
import { DateContext } from '../../App';



function AddFoodDialog(props: {
    title: string;
    meal: mealType;
}) {
    const [isLibraryDialogOpen, setIsLibraryDialogOpen] = useState(false);
    const foodLibrary = useFoodStore((state) => state.food);

    const addFoodToHistory = useFoodStore((state) => state.addFoodToHistory);
    const dateId = useContext(DateContext)

    const history = useFoodStore((state) => state.history);
    let availableFoods = [...foodLibrary]
    if (dateId && history[dateId]) {
        const today_history = history[dateId][props.meal];
        availableFoods = foodLibrary.filter((food: foodType) => !today_history.some((ingredient: ingredientType) => ingredient.food == food.id))
    }

    const handleAddFood = (id: number) => {
        if (dateId) {
            addFoodToHistory(dateId, props.meal, id);
        }
    }

    return (
        <>
            <div className="AddFoodDialog">

                <span className='section-title'>{props.title}</span>

                <button onClick={() => setIsLibraryDialogOpen(true)}>
                    <span> Add Food </span>
                </button>

            </div>

            <Dialog
                visible={isLibraryDialogOpen}
                onHide={() => { if (!isLibraryDialogOpen) return; setIsLibraryDialogOpen(false) }}
                draggable={false}
                resizable={false}
                dismissableMask={false}
                focusOnShow={false}
            >
                <div className='dialog-content'>

                    <span className='dialog-title'>{`Add Food to ${props.meal}`}</span>

                    {
                        availableFoods.map((food: foodType, index) =>
                            <LibraryItem
                                key={index}
                                id={food.id}
                                category={food.category}
                                name={food.name}
                                calories={food.calories}
                                protein={food.protein}
                                carbohidrates={food.carbohidrates}
                                fats={food.fats}
                                fibre={food.fibre}
                                salts={food.salts}
                                meal={props.meal}
                                canDelete={false}
                                onClick={() => handleAddFood(food.id)}
                            />
                        )
                    }

                </div>
            </Dialog>
        </>
    )
}
export default AddFoodDialog;