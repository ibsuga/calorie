import { useContext, useState } from 'react';
import './FoodCard.css';
import { TbMeat } from "react-icons/tb";
import useFoodStore, { mealType } from '../../../store/FoodStore';
import { DateContext } from '../../../App';
import { MdDeleteOutline } from "react-icons/md";


function FoodCard(props: {
    name: string,
    id: number,
    meal: mealType,
    calories: number,
    isListView?: boolean
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isDeleteHovered, setIsDeleteHovered] = useState(false);
    const dateId = useContext(DateContext);
    const [foodGrams, setFoodGrams] = useState(100);

    const removeFoodFromHistory = useFoodStore((state) => state.removeFoodFromHistory);

    function handleDeleteFromLibrary() {
        if (dateId) {
            removeFoodFromHistory(dateId, props.meal, props.id)
        }
    }

    function handleTouchHover() {
        setIsHovered(!isHovered)
        setIsDeleteHovered(!isDeleteHovered)
    }

    const calories_calc = foodGrams * props.calories / 100;


    return (
        <div
            className={`FoodCard ${props.isListView ? "list" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            <div className={`food-image ${isDeleteHovered ? "delete-mode" : ""}`}>
                {isHovered ?
                    <div
                        onClick={handleDeleteFromLibrary}
                        onMouseEnter={() => setIsDeleteHovered(true)}
                        onMouseLeave={() => setIsDeleteHovered(false)}
                    >
                        <MdDeleteOutline />
                    </div>
                    :
                    <div><TbMeat /></div>

                }
            </div>

            <div className="food-data" onTouchStart={handleTouchHover}>
                <div className="food-name">{props.name}</div>
                <div className="calories">
                    <span className='number'>{calories_calc}</span>
                    <span> kcal</span>
                </div>
                <div className="food-grams">
                    <input type="text" className='grams' placeholder='0' value={foodGrams} onChange={(e) => setFoodGrams(Number(e.target.value))} />
                    <span>gr</span>
                </div>
            </div>

        </div>
    )
}

export default FoodCard;