import './LibraryDialog.css';
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import useFoodStore, { foodType } from "../../store/FoodStore";
import { FaSearch } from "react-icons/fa";
import FoodCard from '../DayContent/FoodCard/FoodCard';



function LibraryDialog() {

    const [isLibraryDialogOpen, setIsLibraryDialogOpen] = useState(false);

    const [searchBar, setSearchBar] = useState('');
    let foodLibrary = useFoodStore((state) => state.food);

    /* Filter foods by search bar string */
    if (foodLibrary) {
        foodLibrary = foodLibrary.filter((food: foodType) => {
            const food_name = food.name.toLowerCase();
            const search_string = searchBar.toLowerCase();
            return food_name.includes(search_string);
        })
    }

    return (
        <div className="LibraryDialog">

            <>
                <span onClick={() => setIsLibraryDialogOpen(true)}> Food Library </span>

                <Dialog
                    visible={isLibraryDialogOpen}
                    onHide={() => { if (!isLibraryDialogOpen) return; setIsLibraryDialogOpen(false), setSearchBar('') }}
                    draggable={false}
                    resizable={false}
                    dismissableMask={false}
                    focusOnShow={false}
                >
                    <div className='dialog-content'>

                        <div className="dialog-header">
                            <span className='dialog-title'>Food Library</span>
                            <div className="search-bar">
                                <FaSearch />
                                <input type="text" placeholder='search food' value={searchBar} onChange={(e) => setSearchBar(e.target.value)} />
                            </div>
                        </div>
                        <div className="food-display">
                            {
                                foodLibrary.map((food: foodType, index) =>
                                    <FoodCard
                                        key={index}
                                        food={food.id}
                                        grams={100}
                                        meal={'lunch'}
                                    />
                                )
                            }
                        </div>

                    </div>
                </Dialog>
            </>



        </div>
    )
}

export default LibraryDialog;