import './AddFoodPanel.css'
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { IoAdd } from "react-icons/io5";
import IconSelector from './IconSelector';


function AddFoodPanel() {

    const [isPanelOpen, setIsPanelOpen] = useState(false);

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

                                <IconSelector />

                                <div className='panel-input food-name'>
                                    <motion.input placeholder="Product name" type="text" whileHover={{ scale: 1.05 }} transition={{ duration: 0 }} />
                                </div>

                                <hr />

                                <div className='panel-input'>
                                    <label>Calories (100 gr)</label>
                                    <motion.input placeholder="-" type="text" whileHover={{ scale: 1.05 }} transition={{ duration: 0 }} />
                                </div>

                                <hr />

                                <div className='panel-input'>
                                    <label>Protein</label>
                                    <motion.input placeholder="-" type="text" whileHover={{ scale: 1.05 }} transition={{ duration: 0 }} />
                                </div>
                                <div className='panel-input'>
                                    <label>Carbohidrates</label>
                                    <motion.input placeholder="-" type="text" whileHover={{ scale: 1.05 }} transition={{ duration: 0 }} />
                                </div>
                                <div className='panel-input'>
                                    <label>Fats</label>
                                    <motion.input placeholder="-" type="text" whileHover={{ scale: 1.05 }} transition={{ duration: 0 }} />
                                </div>
                                <div className='panel-input'>
                                    <label>Fibre</label>
                                    <motion.input placeholder="-" type="text" whileHover={{ scale: 1.05 }} transition={{ duration: 0 }} />
                                </div>
                                <div className='panel-input'>
                                    <label>Salts</label>
                                    <motion.input placeholder="-" type="text" whileHover={{ scale: 1.05 }} transition={{ duration: 0 }} />
                                </div>

                                <hr />

                                <img src="src\assets\barcode.png" alt="" />

                            </div>

                            <div className="footer">
                                <button>Save</button>
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