import './LibraryDialog.css';
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import useFoodStore, { foodType } from "../../store/FoodStore";
import LibraryItem from "../DayContent/LibraryItem/LibraryItem";


function LibraryDialog() {

    const [isLibraryDialogOpen, setIsLibraryDialogOpen] = useState(false);
    const foodLibrary = useFoodStore((state) => state.food);

    return (
        <div className="LibraryDialog">

            <>
                <span onClick={() => setIsLibraryDialogOpen(true)}> Food Library </span>

                <Dialog
                    visible={isLibraryDialogOpen}
                    onHide={() => { if (!isLibraryDialogOpen) return; setIsLibraryDialogOpen(false) }}
                    draggable={false}
                    resizable={false}
                    dismissableMask={false}
                    focusOnShow={false}
                >
                    <div className='dialog-content'>

                        <span className='dialog-title'>Food Library</span>

                        {
                            foodLibrary.map((food: foodType, index) =>
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
                                    canDelete={true}
                                />
                            )
                        }

                    </div>
                </Dialog>
            </>



        </div>
    )
}

export default LibraryDialog;