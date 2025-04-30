import { useState } from 'react';
import './AddFoodCard.css';
import { Dialog } from 'primereact/dialog';
import useFoodStore, { foodType } from '../../../store/FoodStore';
import LibraryList from '../FoodList/LibraryList';



function AddFoodCard() {

    const [isLibraryDialogOpen, setIsLibraryDialogOpen] = useState(false);

    const foodLibrary = useFoodStore((state) => state.food);

    return (
        <>
            <div className="AddFoodCard" onClick={() => setIsLibraryDialogOpen(true)}>

                <span> + </span>

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

                    {
                        foodLibrary.map((food: foodType, index) =>
                            <LibraryList
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
                            />
                        )
                    }

                </div>
            </Dialog>
        </>
    )
}
export default AddFoodCard;