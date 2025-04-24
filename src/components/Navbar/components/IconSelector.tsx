import './IconSelector.css';
import { JSX, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CiApple } from "react-icons/ci";
import { TbMeat } from "react-icons/tb";
import { IoFishOutline } from "react-icons/io5";
import { GiBroccoli, GiGrainBundle } from "react-icons/gi";
import { RiDrinks2Line } from "react-icons/ri";


interface foodIconsI { [key: string]: JSX.Element };



function IconSelector() {

    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState("meat");

    let FoodIcons: foodIconsI = {
        'meat': <TbMeat />,
        'fish': <IoFishOutline />,
        'fruit': <CiApple />,
        'vegetable': <GiBroccoli />,
        'grain': <GiGrainBundle />,
        'drink': <RiDrinks2Line />,
    }

    function handleSelectIcon(type: string) {
        setSelectedIcon(type);
        setIsSelectorOpen(false);
    }


    return (

        <div className="IconSelector">

            <div className="food-icon" onClick={() => setIsSelectorOpen(!isSelectorOpen)}>
                {
                    FoodIcons[selectedIcon]
                }
            </div>

            <AnimatePresence>
                {
                    isSelectorOpen &&

                    <motion.div
                        className="icon-selector-panel"
                        initial={{ opacity: 0, scale: 0, borderRadius: 100 }}
                        animate={{ opacity: 1, scale: 1, borderRadius: 0 }}
                        exit={{ opacity: 0, scale: 0, borderRadius: 100 }}
                        transition={{ type: "tween", duration: 0.15 }}
                    >

                        <div className="icon-list">
                            <TbMeat onClick={() => handleSelectIcon("meat")} />
                            <IoFishOutline onClick={() => handleSelectIcon("fish")} />
                            <CiApple onClick={() => handleSelectIcon("fruit")} />
                            <GiBroccoli onClick={() => handleSelectIcon("vegetable")} />
                            <GiGrainBundle onClick={() => handleSelectIcon("grain")} />
                            <RiDrinks2Line onClick={() => handleSelectIcon("drink")} />
                        </div>

                    </motion.div>
                }
            </AnimatePresence>

        </div>
    )
}

export default IconSelector;