import './MenuBar.css';
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";

function MenuBar() {
    return (
        <div className="MenuBar">
            <MdOutlineKeyboardArrowLeft />
            <span>June, 5th</span>
            <MdOutlineKeyboardArrowRight />
        </div>
    )
}

export default MenuBar;