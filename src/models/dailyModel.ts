import mongoose, {Schema, Types, Document} from "mongoose";

// !오늘 먹은 음식으로 들어갈 모델
export interface IDaily extends Document{
    userId: Types.ObjectId //유저 오브젝트id
    date: string
    meals: {
        foodId?: Types.ObjectId //food모델 참조 
        name: string
        protein: number
        calorie: number
        unit: string
    }[]
    totalProtein: number
    totalCalorie: number
    createdAt: Date
    updatedAt: Date
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
            calorie: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                required: true
            },
        }
    ],
    totalProtein: {
        type: Number,
        default: 0
    },
    totalCalorie: {
        type: Number,
        default: 0
    },
    
}, { timestamps: true })

DailySchema.index({ userId: 1, date: 1 }, { unique: true })



export default mongoose.models.Daily || mongoose.model<IDaily>('Daily', DailySchema)