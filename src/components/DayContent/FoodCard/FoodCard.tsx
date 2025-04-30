import { useState } from 'react';
import './FoodCard.css';
import { TbMeat } from "react-icons/tb";


function FoodCard() {

    const [foodGrams, setFoodGrams] = useState(100);



    const test_food = {
        'base-grams': 100,
        'base-calories': 300,
    }

    const calories_calc = foodGrams * test_food['base-calories'] / test_food['base-grams'];


    return (
        <div className="FoodCard">

            <div className="food-image"><TbMeat /></div>

            <div className="card-body">

                <div className="food-name"> Pechuga de Pollo </div>

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