import './AddFoodPanel.css'
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { IoIosAddCircle } from 'react-icons/io';


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

            <AnimatePresence>
                {
                    isPanelOpen &&
                    <motion.div
                        className='food-panel'
                        initial={{ opacity: 0, height: 0, width: 0 }}
                        animate={{ opacity: 1, height: 600, width: 500 }}
                        exit={{ opacity: 0, height: 0, width: 0 }}
                        transition={{
                            type: "tween",
                            duration: 0.3,
                            opacity: { ease: "easeInOut" }
                        }}
                    >

                        <span className='panel-title'>Add food</span>

                        <motion.div className='panel-content'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >

                            <div className="icon-selector">
                                <span>ICON SELECT</span>
                            </div>

                            <div className='panel-input'>
                                <label>Food name</label>
                                <motion.input placeholder="-" type="text" whileHover={{ scale: 1.05 }} transition={{ duration: 0 }} />
                            </div>

                            <div className='panel-input'>
                                <label>Calories (100 gr)</label>
                                <motion.input placeholder="-" type="text" whileHover={{ scale: 1.05 }} transition={{ duration: 0 }} />
                            </div>

                            <div className="macro-box">

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
                                    <label></label>
                                    <motion.input placeholder="-" type="text" whileHover={{ scale: 1.05 }} transition={{ duration: 0 }} />
                                </div>

                            </div>


                        </motion.div>

                    </motion.div>
                }
            </AnimatePresence>

        </div>
    )
}

export default AddFoodPanel;