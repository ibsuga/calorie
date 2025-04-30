import './AddFoodPanel.css'
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { IoAdd } from "react-icons/io5";
import IconSelector from './IconSelector';
import useFoodStore from '../../../store/FoodStore';


function AddFoodPanel() {

    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const [category, setCategory] = useState('meat')
    const [name, setName] = useState('');
    const [calories, setCalories] = useState(0);
    const [protein, setProtein] = useState(0);
    const [carbohidrates, setCarbohidrates] = useState(0);
    const [fats, setFats] = useState(0);
    const [fibre, setFibre] = useState(0);
    const [salts, setSalts] = useState(0);


    const createFood = useFoodStore((state) => state.createFood);


    function handleCreateFood() {
        createFood(category, name, calories, protein, carbohidrates, fats, fibre, salts);
        setCategory('');
        setName('');
        setCalories(0);
        setProtein(0);
        setCarbohidrates(0);
        setFats(0);
        setFibre(0);
        setSalts(0);
        setIsPanelOpen(false);
    }


    return (
        <div className="AddFoodPanel">

            <button
                className={isPanelOpen ? 'button-close' : 'button-open'}
                onClick={() => setIsPanelOpen(!isPanelOpen)}
            >
                < IoAdd className='panel-button' />
            </button>
            <AnimatePresence>
                {
                    isPanelOpen &&
                    <motion.div
                        className='food-panel'
                        initial={{ opacity: 0, height: 0, width: 0 }}
                        animate={{ opacity: 1, height: "auto", width: "auto" }}
                        exit={{ opacity: 0, height: 0, width: 0 }}
                        transition={{
                            type: "tween",
                            duration: 0.25,
                            opacity: { ease: "easeInOut" }
                        }}
                    >

                        <motion.div className='panel-content'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: "tween", duration: 0.05 }}
                        >
                            <span className='panel-title'>New Food</span>

                            <div className="panel-box">

                                <IconSelector setCategory={setCategory} />

                                <div className='panel-input food-name'>
                                    <motion.input
                                        placeholder="Product name"
                                        type="text"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0 }}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <hr />

                                <div className='panel-input'>

                                    <label>Calories (100 gr)</label>
                                    <motion.input
                                        placeholder="-"
                                        type="text"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0 }}
                                        onChange={(e) => setCalories(Number(e.target.value))}

                                    />
                                </div>

                                <hr />

                                <div className='panel-input'>
                                    <label>Protein</label>
                                    <motion.input
                                        placeholder="-"
                                        type="text"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0 }}
                                        onChange={(e) => setProtein(Number(e.target.value))}

                                    />
                                </div>
                                <div className='panel-input'>
                                    <label>Carbohidrates</label>
                                    <motion.input
                                        placeholder="-"
                                        type="text"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0 }}
                                        onChange={(e) => setCarbohidrates(Number(e.target.value))}

                                    />
                                </div>
                                <div className='panel-input'>
                                    <label>Fats</label>
                                    <motion.input
                                        placeholder="-"
                                        type="text"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0 }}
                                        onChange={(e) => setFats(Number(e.target.value))}

                                    />
                                </div>
                                <div className='panel-input'>
                                    <label>Fibre</label>
                                    <motion.input
                                        placeholder="-"
                                        type="text"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0 }}
                                        onChange={(e) => setFibre(Number(e.target.value))}

                                    />
                                </div>
                                <div className='panel-input'>
                                    <label>Salts</label>
                                    <motion.input
                                        placeholder="-"
                                        type="text"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0 }}
                                        onChange={(e) => setSalts(Number(e.target.value))}

                                    />
                                </div>

                                <hr />

                                <img src="src\assets\barcode.png" alt="" />

                            </div>

                            <div className="footer">
                                <button onClick={() => handleCreateFood()}>Save</button>
                                <button onClick={() => setIsPanelOpen(false)}>Cancel</button>
                            </div>


                        </motion.div>

                    </motion.div>
                }
            </AnimatePresence>

        </div>
    )
}

export default AddFoodPanel;