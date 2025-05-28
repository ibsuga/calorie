import { useContext, useState } from 'react';
import './FoodCard.css';
import { TbMeat } from "react-icons/tb";
import useFoodStore, { foodType, mealType } from '../../../store/FoodStore';
import { DateContext } from '../../../App';
import { MdDeleteOutline } from "react-icons/md";


function FoodCard(props: {
    food: number,
    grams: number,
    meal: mealType,
    isListView?: boolean
    onClick?: () => void,
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isDeleteHovered, setIsDeleteHovered] = useState(false);
    const dateId = useContext(DateContext);

    const removeFoodFromHistory = useFoodStore((state) => state.removeFoodFromHistory);
    const updateFoodGrams = useFoodStore((state) => state.updateFoodGrams);
    const food = useFoodStore((state) => state.food);
    const categoryIcons = useFoodStore((state) => state.categoryIcons);
    const food_data = food.find((food: foodType) => food.id == props.food);


    function handleDelete() {
        if (dateId && food_data) {
            removeFoodFromHistory(dateId, props.meal, food_data.id)
        }
    }

    function handleUpdate(e: React.ChangeEvent<HTMLInputElement>) {
        if (dateId && food_data) {
            updateFoodGrams(dateId, props.meal, food_data?.id, Number(e.target.value))
        }
    }

    function handleTouchHover() {
        setIsHovered(!isHovered)
        setIsDeleteHovered(!isDeleteHovered)
    }

    const calories_calc = props.grams * (food_data ? food_data.calories : 0) / 100;
    const protein_calc = props.grams * (food_data ? food_data.protein : 0) / 100;
    const carbohidrates_calc = props.grams * (food_data ? food_data.carbohidrates : 0) / 100;
    const fats_calc = props.grams * (food_data ? food_data.fats : 0) / 100;
    const fibre_calc = props.grams * (food_data ? food_data.fibre : 0) / 100;
    const salts_calc = props.grams * (food_data ? food_data.salts : 0) / 100;

    return (
        <div
            className={`FoodCard ${props.meal}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={props.onClick}
        >

            {/* <div className={`food-image ${isDeleteHovered ? "delete-mode" : ""}`}>
                {isHovered ?
                    <div
                        onClick={handleDelete}
                        onMouseEnter={() => setIsDeleteHovered(true)}
                        onMouseLeave={() => setIsDeleteHovered(false)}
                    >
                        <MdDeleteOutline />
                    </div>
                    :
                    
                }
            </div> */}

            <div className={`food-image ${props.meal}`}>
                {food_data?.category && categoryIcons[food_data?.category]}
            </div>

            <div className="food-data" onTouchStart={handleTouchHover}>

                <div className="food-name">{food_data?.name}</div>

                <div className="macros">
                    <div className='label'>protein</div>
                    <div className='label'>carbs</div>
                    <div className='label'>fats</div>
                    <div className='label'>fibre</div>
                    <div className='label'>salts</div>
                    <div className='value'>{protein_calc}</div>
                    <div className='value'>{carbohidrates_calc}</div>
                    <div className='value'>{fats_calc}</div>
                    <div className='value'>{fibre_calc}</div>
                    <div className='value'>{salts_calc}</div>
                </div>

                <div className='footer'>

                    <div className="food-grams">
                        <input type="number" className='grams' placeholder='0' value={props.grams} onChange={handleUpdate} />
                        <span>gr</span>
                    </div>
                    <div className="calories">
                        <span className='number'>{calories_calc}</span>
                        <span>kcal</span>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default FoodCard;