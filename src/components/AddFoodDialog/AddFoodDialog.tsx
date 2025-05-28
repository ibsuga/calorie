import { useContext, useState } from 'react';
import './AddFoodDialog.css';
import { Dialog } from 'primereact/dialog';
import useFoodStore, { foodType, ingredientType } from '../../store/FoodStore';
import { mealType } from '../../store/FoodStore';
import { DateContext } from '../../App';
import { FaSearch } from "react-icons/fa";
import FoodCard from '../DayContent/FoodCard/FoodCard';



function AddFoodDialog(props: {
    meal: mealType;
}) {
    const [isLibraryDialogOpen, setIsLibraryDialogOpen] = useState(false);
    const [searchBar, setSearchBar] = useState('');

    const foodLibrary = useFoodStore((state) => state.food);

    const addFoodToHistory = useFoodStore((state) => state.addFoodToHistory);
    const dateId = useContext(DateContext)

    const history = useFoodStore((state) => state.history);
    let availableFoods = [...foodLibrary]
    if (dateId && history[dateId]) {
        const today_history = history[dateId][props.meal];
        availableFoods = foodLibrary.filter((food: foodType) => !today_history.some((ingredient: ingredientType) => ingredient.food == food.id))
    }

    /* Filter foods by search bar string */
    if (searchBar) {
        availableFoods = availableFoods.filter((food: foodType) => {
            const food_name = food.name.toLowerCase();
            const search_string = searchBar.toLowerCase();
            return food_name.includes(search_string);
        })
    }

    const handleAddFood = (id: number) => {
        if (dateId) {
            addFoodToHistory(dateId, props.meal, id);
        }
    }

    return (
        <>
            <div className="AddFoodDialog">

                <button onClick={() => setIsLibraryDialogOpen(true)}>
                    +
                </button>

            </div>

            <Dialog
                visible={isLibraryDialogOpen}
                onHide={() => { if (!isLibraryDialogOpen) return; setIsLibraryDialogOpen(false), setSearchBar('') }}
                draggable={false}
                resizable={false}
                dismissableMask={false}
                focusOnShow={false}
            >
                <div className='dialog-content'>

                    <div className='dialog-header'>

                        <span className='dialog-title'>{`Add Food to ${props.meal}`}</span>

                        <div className="search-bar">
                            <FaSearch />
                            <input type="text" placeholder='Search food' value={searchBar} onChange={(e) => setSearchBar(e.target.value)} />
                        </div>

                    </div>
                    <div className="food-display">
                        {
                            availableFoods.map((food: foodType, index) =>
                                <FoodCard
                                    key={index}
                                    food={food.id}
                                    grams={100}
                                    meal={props.meal}
                                    onClick={() => handleAddFood(food.id)}
                                />
                            )
                        }
                    </div>

                </div>
            </Dialog>
        </>
    )
}
export default AddFoodDialog;