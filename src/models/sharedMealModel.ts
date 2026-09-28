import mongoose from "mongoose";

export interface SharedMealFood {
    name: string
    calorie: number
    protein: number
    unit: string
    quantity: number
}

export interface SharedMeal {
    shareId: string
    displayName: string
    meals: SharedMealFood[]
    totalCalorie: number
    totalProtein: number
    createdAt: Date
}

const sharedMealSchema = new mongoose.Schema<SharedMeal>({
    shareId: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    meals: [
        {
            name: String,
            calorie: Number,
            protein: Number,
            unit: String,
            quantity: Number
        }
    ],
    totalCalorie: {
        type: Number,
        required: true
    },
    totalProtein: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const SharedMealModel = mongoose.models.SharedMeal as mongoose.Model<SharedMeal> || mongoose.model<SharedMeal>('SharedMeal', sharedMealSchema)

export default SharedMealModel