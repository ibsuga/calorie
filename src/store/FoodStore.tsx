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


export type ingredientType = {
    'food': number,
    'grams': number,
}

type mealsType = {
    'breakfast': ingredientType[],
    'lunch': ingredientType[],
    'dinner': ingredientType[],
    'snacks': ingredientType[],
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
    calorieLimit: number,
    createFood: (category: string, name: string, calories: number, protein: number, carbohidrates: number, fats: number, fibre: number, salts: number) => void,
    deleteFood: (id: number) => void,
    createHistory: (day: string) => void,
    deleteHistory: (day: string) => void,
    addFoodToHistory: (day: string, meal: mealType, food_id: number) => void,
    removeFoodFromHistory: (day: string, meal: mealType, food_id: number) => void,
    updateFoodGrams: (day: string, meal: mealType, food_id: number, grams: number) => void,
    updateCalorieLimit: (calories: number) => void,
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
    calorieLimit: localStorage.getItem('CalorieLimit') ? JSON.parse(localStorage.getItem('CalorieLimit') || '') : [],

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
        history[day][meal].push({
            'food': food_id,
            'grams': 0
        })
        localStorage.setItem('History', JSON.stringify(history));
        return { history }
    }),

    removeFoodFromHistory: (day, meal, food_id) => set((state) => {
        let history = { ...state.history };
        history[day][meal] = history[day][meal].filter((ingredient: ingredientType) => ingredient.food !== food_id);
        localStorage.setItem('History', JSON.stringify(history));
        return { history }
    }),

    updateFoodGrams: (day, meal, food_id, grams) => set((state) => {
        let history = { ...state.history };
        var index = history[day][meal].findIndex((ingredient) => ingredient.food == food_id);
        if (index != -1) {
            history[day][meal][index].grams = grams
        }
        localStorage.setItem('History', JSON.stringify(history));
        return { history }
    }),

    updateCalorieLimit: (calories) => set(() => {
        localStorage.setItem('CalorieLimit', JSON.stringify(calories));
        return { "calorieLimit": calories }
    }),

}))


export default useFoodStore;