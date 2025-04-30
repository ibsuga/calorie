import useFoodStore from '../../../store/FoodStore';
import './LibraryList.css';

function LibraryList(props: {
    id: number,
    category: string,
    name: string,
    calories: number,
    protein: number,
    carbohidrates: number,
    fats: number,
    fibre: number,
    salts: number,
}) {
    const deleteFood = useFoodStore((state) => state.deleteFood);
    const categoryIcons = useFoodStore((state) => state.categoryIcons);

    return (
        <div className="LibraryList">

            <div className='food-image'>
                <div>{categoryIcons[props.category]}</div>
            </div>

            <div className='food-data'>

                <div className="food-name">{props.name}</div>

                <div className="calories">
                    <span className='number'>{props.calories}</span>
                    <span> kcal</span>
                </div>

                <div className="food-grams">100 gr</div>

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

                <button onClick={() => deleteFood(props.id)}>Delete</button>
            </div>

        </div>
    )
}

export default LibraryList;
