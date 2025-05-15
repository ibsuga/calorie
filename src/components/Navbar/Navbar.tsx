import LibraryDialog from '../LibraryDialog/LibraryDialog';
import AddFoodPanel from './components/AddFoodPanel';
import './Navbar.css';


function Navbar() {
    return (
        <div className="Navbar">

            <LibraryDialog />

            <span className='title'>Calorie</span>

            <AddFoodPanel />

        </div>
    )
}

export default Navbar;