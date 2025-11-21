import mongoose, {Schema, Document} from "mongoose";

export interface IDaily extends Document{
    userId: string; //유저 오브젝트id
    date: string;
    meals: {
        foodId?: string; //food모델 참조 
        name: string;
        protein: number;
        calories: number;
        quantity: number; //그램 당
    }[];
    totalProtein: number;
    totalCalories: number;
    createdAt: Date;
}

const DailySchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String,
        required: true
    },
    meals: [
        {
            foodId:{
                type: Schema.Types.ObjectId,
                ref: 'Food'
            },
            name: {
                type: String,
                required: true
            },
            protein: {
                type: Number,
                required: true
            },
            calories: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        }
    ],
    totalProtein: {
        type: Number,
        required: true
    },
    totalCalories: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


export default mongoose.models.Daily || mongoose.model<IDaily>('Daily', DailySchema)