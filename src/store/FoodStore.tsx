import { JSX } from "react";
import { CiApple } from "react-icons/ci";
import { GiBroccoli, GiGrainBundle } from "react-icons/gi";
import { IoFishOutline } from "react-icons/io5";
import { RiDrinks2Line } from "react-icons/ri";
import { TbMeat } from "react-icons/tb";
import { create } from "zustand";


/* Returns an ID from a date in example format: 2025-05-26 */
export const getIdFromDate = (date: Date) => {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear()

    return year + "-" + month + "-" + day
}

/* Returns a Date object from the ID */
export const getDateFromId = (id: string) => {
    return new Date(id)
}

export type mealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

type mealsType = {
    'breakfast': number[],
    'lunch': number[],
    'dinner': number[],
    'snacks': number[],
};

type historyType = {
    [key: string]: mealsType
}

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
    history: historyType,
    categoryIcons: { [key: string]: JSX.Element },
    createFood: (category: string, name: string, calories: number, protein: number, carbohidrates: number, fats: number, fibre: number, salts: number) => void,
    deleteFood: (id: number) => void,
    createHistory: (day: string) => void,
    deleteHistory: (day: string) => void,
    addFoodToHistory: (day: string, meal: mealType, food_id: number) => void,
    removeFoodFromHistory: (day: string, meal: mealType, food_id: number) => void,
}


const useFoodStore = create<foodStore>((set) => ({
    food: localStorage.getItem('FoodLibrary') ? JSON.parse(localStorage.getItem('FoodLibrary') || '') : [],
    history: localStorage.getItem('History') ? JSON.parse(localStorage.getItem('History') || '') : {},
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
    }),

    createHistory: (day) => set((state) => {
        let history = { ...state.history };
        if (!state.history[day]) {
            history[day] = {
                'breakfast': [],
                'lunch': [],
                'dinner': [],
                'snacks': []
            }
        }
        localStorage.setItem('History', JSON.stringify(history));
        return { history }
    }),

    deleteHistory: (day) => set((state) => {
        let history = { ...state.history };
        delete history[day]
        localStorage.setItem('History', JSON.stringify(history));
        return { history }
    }),

    addFoodToHistory: (day, meal, food_id) => set((state) => {
        let history = { ...state.history };
        history[day][meal].push(food_id)
        localStorage.setItem('History', JSON.stringify(history));
        return { history }
    }),

    removeFoodFromHistory: (day, meal, food_id) => set((state) => {
        let history = { ...state.history };
        history[day][meal] = history[day][meal].filter((food: number) => food !== food_id);
        localStorage.setItem('History', JSON.stringify(history));
        return { history }
    }),

}))


export default useFoodStore;