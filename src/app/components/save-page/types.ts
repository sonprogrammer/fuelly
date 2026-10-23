import { SavedFood } from "@/types/food"




export interface EachVersionProps{
    savedFoods: SavedFood[]
    addFood: (food: SavedFood['food']) => void
    deleteFood: (foodId: string) => void
}