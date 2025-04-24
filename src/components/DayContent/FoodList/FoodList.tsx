import { TbMeat } from 'react-icons/tb';
import './FoodList.css';

function FoodList() {
    return (
        <div className="FoodList">

            <div className='food-image'>
                <div><TbMeat /></div>
            </div>

            <div className='food-data'>
                <div className="food-name">Pechuga de Pollo</div>
                <div className="calories">
                    <span className='number'>200</span>
                    <span> kcal</span>
                </div>
                <div className="food-grams">100 gr</div>
            </div>

        </div>
    )
}

export default FoodList;