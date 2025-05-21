import './MenuBar.css';
import { Calendar } from 'primereact/calendar';
import { useState } from 'react';
import { Nullable } from 'primereact/ts-helpers';

import { getIdFromDate } from '../../store/FoodStore';
import CalorieBar from '../DayContent/CalorieBar/CalorieBar';


function MenuBar(props: {
    setDateId: (id: string) => void,
    mealCalories: number[],
    totalCalories: number,
    calorieLimit: number,
}) {
    const [date, setDate] = useState<Nullable<Date>>(new Date());

    const handleDateChange = (new_date: Nullable<Date>) => {
        console.log('handling date change!')
        if (new_date) {
            setDate(new_date)
            props.setDateId(getIdFromDate(new_date))
        }
    }

    return (
        <div className="MenuBar">

            <div>
                <Calendar
                    value={date}
                    onChange={(e) => handleDateChange(e.value)}
                    dateFormat='DD, MM d'
                />
                <span>{props.totalCalories} <span className="label">kcal</span></span>
            </div>

            <CalorieBar
                calorie_limit={props.calorieLimit}
                valueBreakfast={props.mealCalories[0]}
                valueLunch={props.mealCalories[1]}
                valueDinner={props.mealCalories[2]}
                valueSnacks={props.mealCalories[3]}
            />

        </div>
    )
}

export default MenuBar;