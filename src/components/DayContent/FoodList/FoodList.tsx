import './FoodList.css';

function FoodList(props: {
    icon: string,
    name: string,
    calories: number,
    // protein: number,
    // carbohidrates: number,
    // fats: number,
    // fibre: number,
    // salts: number,

}) {

    return (
        <div className="FoodList">

            <div className='food-image'>
                <div>{props.icon}</div>
            </div>

            <div className='food-data'>
                <div className="food-name">{props.name}</div>
                <div className="calories">
                    <span className='number'>{props.calories}</span>
                    <span> kcal</span>
                </div>
                <div className="food-grams">100 gr</div>
            </div>

        </div>
    )
}

export default FoodList;