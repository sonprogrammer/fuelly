import { Food } from "@/types/food";

export interface SavedFood {
    _id: string;
    savedUser: string;
    foodId: Food
}


export interface EachVersionProps{
    savedFoods: SavedFood[]
    addFood: (food: Food) => void
    deleteFood: (foodId: string) => void
}