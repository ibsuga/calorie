import './CalorieBar.css';

function CalorieBar(props: {
    calorie_limit: number;
    valueBreakfast: number;
    valueLunch: number;
    valueDinner: number;
    valueSnacks: number;
}) {

    const total_calories_value = props.valueBreakfast + props.valueLunch + props.valueDinner + props.valueSnacks;
    const overflow_value = Math.max(total_calories_value - props.calorie_limit, 0)

    var bar_max_value = props.calorie_limit
    if (overflow_value > 0) {
        bar_max_value += overflow_value
    }

    return (
        <div className="CalorieBar">
            <div className="CalorieBar-calories" style={{ width: `${props.calorie_limit * 100 / bar_max_value}%` }}>
                <div className="CalorieBar-breakfast" style={{ width: `${props.valueBreakfast * 100 / props.calorie_limit}%` }} />
                <div className="CalorieBar-lunch" style={{ width: `${props.valueLunch * 100 / props.calorie_limit}%` }} />
                <div className="CalorieBar-dinner" style={{ width: `${props.valueDinner * 100 / props.calorie_limit}%` }} />
                <div className="CalorieBar-snacks" style={{ width: `${props.valueSnacks * 100 / props.calorie_limit}%` }} />
            </div>
            <div className="CalorieBar-excess" style={{ width: `${overflow_value * 100 / bar_max_value}%` }}>

                <div className="CalorieBar-overflow" style={{ width: `100%` }} />

            </div>
        </div>
    )
}


export default CalorieBar;