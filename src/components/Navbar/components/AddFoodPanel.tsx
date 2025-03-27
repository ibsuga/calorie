import { IoIosAddCircle } from 'react-icons/io';
import './AddFoodPanel.css'
import { useState } from 'react';


function AddFoodPanel() {

    const [isPanelOpen, setIsPanelOpen] = useState(false);

    return (
        <div className="AddFoodPanel">

            <button
                className={isPanelOpen ? 'button-close' : 'button-open'}
                onClick={() => setIsPanelOpen(!isPanelOpen)}
            >
                < IoIosAddCircle />
            </button>

            {
                isPanelOpen && <div className='food-panel'>panel</div>
            }



        </div>
    )
}

export default AddFoodPanel;