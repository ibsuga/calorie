import './DayContent.css';

function DayContent() {
    return (
        <div className="DayContent">

            <div className="filter-bar">
                <button>Breakfast</button>
                <button>Lunch</button>
                <button>Dinner</button>
                <button>Snacks</button>
                <button>All</button>
            </div>

            <div className="content">day content</div>
        </div>
    )
}

export default DayContent;