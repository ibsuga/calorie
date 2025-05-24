import './MenuBar.css';
import { Calendar } from 'primereact/calendar';
import { useState } from 'react';
import { Nullable } from 'primereact/ts-helpers';

import { getIdFromDate } from '../../store/FoodStore';
import CalorieBar from '../DayContent/CalorieBar/CalorieBar';
import { dayTotalMacrosType } from '../DayContent/DayContent';


function MenuBar(props: {
    setDateId: (id: string) => void,
    mealCalories: number[],
    dayTotalCalories: number,
    dayTotalMacros: dayTotalMacrosType,
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

                {/* TO DO */}
                <div className='macros'>
                    <span>protein:{props.dayTotalMacros.protein}</span>
                    <span>carbs:{props.dayTotalMacros.carbohidrates}</span>
                    <span>fats:{props.dayTotalMacros.fats}</span>
                    <span>fibre:{props.dayTotalMacros.fibre}</span>
                    <span>salts:{props.dayTotalMacros.salts}</span>
                </div>


                <span>{props.dayTotalCalories} <span className="label">kcal</span></span>
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