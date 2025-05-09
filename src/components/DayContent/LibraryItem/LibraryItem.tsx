import useFoodStore from '../../../store/FoodStore';
import { mealType } from '../../../store/FoodStore';
import { MdDeleteOutline } from "react-icons/md";

import './Libraryitem.css';

function LibraryItem(props: {
    id: number,
    category: string,
    name: string,
    calories: number,
    protein: number,
    carbohidrates: number,
    fats: number,
    fibre: number,
    salts: number,
    meal?: mealType,
    canDelete: boolean,
    onClick?: () => void,
}) {

    const categoryIcons = useFoodStore((state) => state.categoryIcons);
    const deleteFood = useFoodStore((state) => state.deleteFood);

    const handleDeleteFood = (e: React.MouseEvent) => {
        e.preventDefault()
        deleteFood(props.id)
    }

    return (

        <div className="Libraryitem" onClick={props.onClick}>

            <div className='food-image'>
                <div>{categoryIcons[props.category]}</div>
            </div>

            <div className='food-data'>

                <div className="food-name">{props.name}</div>



                <div className="calories">
                    <span className='number'>{props.calories}</span>
                    <span>kcal</span>
                </div>

                {/* <div className="food-grams">100 gr</div> */}



                <div className="macros">
                    <div>
                        <span className='macro-name'>Protein</span>
                        <span>{props.protein}</span>
                    </div>
                    <div>
                        <span className='macro-name'>Carbs</span>
                        <span>{props.carbohidrates}</span>
                    </div>
                    <div>
                        <span className='macro-name'>Fats</span>
                        <span>{props.fats}</span>
                    </div>
                    <div>
                        <span className='macro-name'>Fibre</span>
                        <span>{props.fibre}</span>
                    </div>
                    <div>
                        <span className='macro-name'>Salts</span>
                        <span>{props.salts}</span>
                    </div>
                </div>


            </div>
            {props.canDelete && <button onClick={handleDeleteFood}><MdDeleteOutline /></button>}

        </div>
    )
}

export default LibraryItem;
