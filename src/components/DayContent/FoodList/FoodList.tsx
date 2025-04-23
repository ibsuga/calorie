import './FoodList.css';

function FoodList() {
    return (
        <div className="FoodList">

            <div className='food-image'>
                <div>img</div>
            </div>

            <div className='food-data'>
                <div className="food-name">brgr</div>
                <div className="food-grams">100 gr</div>
                <div className="calories">200 kcal</div>
                <div className="category">category</div>
            </div>

        </div>
    )
}

export default FoodList;