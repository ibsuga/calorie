import { JSX } from "react";
import { CiApple } from "react-icons/ci";
import { GiBroccoli, GiGrainBundle } from "react-icons/gi";
import { IoFishOutline } from "react-icons/io5";
import { RiDrinks2Line } from "react-icons/ri";
import { TbMeat } from "react-icons/tb";
import { create } from "zustand";


export type foodType = {
    id: number,
    category: string,
    name: string,
    calories: number,
    protein: number,
    carbohidrates: number,
    fats: number,
    fibre: number,
    salts: number,
}

type foodStore = {
    food: foodType[] | [],
    categoryIcons: { [key: string]: JSX.Element },
    createFood: (category: string, name: string, calories: number, protein: number, carbohidrates: number, fats: number, fibre: number, salts: number) => void,
    deleteFood: (id: number) => void,
}


const useFoodStore = create<foodStore>((set) => ({

    food: localStorage.getItem('FoodLibrary') ? JSON.parse(localStorage.getItem('FoodLibrary') || '') : [],
    categoryIcons: {
        'meat': <TbMeat />,
        'fish': <IoFishOutline />,
        'fruit': <CiApple />,
        'vegetable': <GiBroccoli />,
        'grain': <GiGrainBundle />,
        'drink': <RiDrinks2Line />,
    },

    createFood: (category, name, calories, protein, carbohidrates, fats, fibre, salts) => set((state) => {
        let food = [...state.food];
        const newFood = {
            id: Date.now(),
            category: category,
            name: name,
            calories: calories,
            protein: protein,
            carbohidrates: carbohidrates,
            fats: fats,
            fibre: fibre,
            salts: salts,
        }
        food.push(newFood);
        localStorage.setItem('FoodLibrary', JSON.stringify(food));
        return { food: food };
    }),

    deleteFood: (id) => set((state) => {
        let food = [...state.food];
        food = food.filter((food) => food.id !== id);
        localStorage.setItem('FoodLibrary', JSON.stringify(food));
        return { food: food };
    })

}))


export default useFoodStore;