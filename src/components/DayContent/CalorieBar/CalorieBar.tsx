import './CalorieBar.css';

function CalorieBar(props: {
    max_value: number;
    valueBreakfast: number;
    valueLunch: number;
    valueDinner: number;
    valueSnacks: number;
}) {

    const total_calories_value = props.valueBreakfast + props.valueLunch + props.valueDinner + props.valueSnacks;
    const overflow_value = total_calories_value - props.max_value

    var calculated_max_value = props.max_value
    if (overflow_value > 0) {
        calculated_max_value += overflow_value
    }
    console.log(overflow_value);

    return (
        <div className="CalorieBar">
            <div className="CalorieBar-calories" style={{ width: `${props.max_value * 100 / calculated_max_value}%` }}>
                <div className="CalorieBar-breakfast" style={{ width: `${props.valueBreakfast * 100 / props.max_value}%` }} />
                <div className="CalorieBar-lunch" style={{ width: `${props.valueLunch * 100 / props.max_value}%` }} />
                <div className="CalorieBar-dinner" style={{ width: `${props.valueDinner * 100 / props.max_value}%` }} />
                <div className="CalorieBar-snacks" style={{ width: `${props.valueSnacks * 100 / props.max_value}%` }} />
            </div>
            <div className="CalorieBar-excess" style={{ width: `${overflow_value * 100 / calculated_max_value}%` }}>
                <div className="CalorieBar-overflow" style={{ width: `100%` }} />
            </div>
        </div>
    )
}


export default CalorieBar;