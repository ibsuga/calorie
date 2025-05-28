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
    const [macroCalorieToggle, setMacroCalorieToggle] = useState(false);

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

                {
                    macroCalorieToggle ?

                        <div className='macros' onClick={() => setMacroCalorieToggle(!macroCalorieToggle)}>
                            <span>{props.dayTotalMacros.protein}</span>
                            <span>protein</span>
                            <span>{props.dayTotalMacros.carbohidrates}</span>
                            <span>carbs</span>
                            <span>{props.dayTotalMacros.fats}</span>
                            <span>fats</span>
                            <span>{props.dayTotalMacros.fibre}</span>
                            <span>fibre</span>
                            <span>{props.dayTotalMacros.salts}</span>
                            <span>salts</span>
                        </div>
                        :
                        <span onClick={() => setMacroCalorieToggle(!macroCalorieToggle)}>{props.dayTotalCalories} <span className="label">kcal</span></span>
                }
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