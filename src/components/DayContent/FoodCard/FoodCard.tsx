import './FoodCard.css';
import { TbMeat } from "react-icons/tb";


function FoodCard() {
    return (
        <div className="FoodCard">

            <div className="food-image"><TbMeat /></div>

            <div className="card-body">

                <div className="food-name"> Pechuga de Pollo </div>

                <div className="calories">
                    <span className='number'>200</span>
                    <span> kcal</span>
                </div>
                <div className="food-grams">100 gr</div>

            </div>


        </div>
    )
}

export default FoodCard;