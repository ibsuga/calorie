import './MenuBar.css';
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Calendar } from 'primereact/calendar';
import { useState } from 'react';
import { Nullable } from 'primereact/ts-helpers';

import { getIdFromDate } from '../../store/FoodStore';


function MenuBar(props: {
    setDateId: (id: string) => void,
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
            <Calendar
                value={date}
                onChange={(e) => handleDateChange(e.value)}
                dateFormat='DD, MM d'
            />

        </div>
    )
}

export default MenuBar;