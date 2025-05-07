import LibraryDialog from '../LibraryDialog/LibraryDialog';
import AddFoodPanel from './components/AddFoodPanel';
import './Navbar.css';


function Navbar() {
    return (
        <div className="Navbar">

            <span className='title'>Calorie</span>

            <div className="icons">

                <LibraryDialog />

                <AddFoodPanel />
            </div>

        </div>
    )
}

export default Navbar;