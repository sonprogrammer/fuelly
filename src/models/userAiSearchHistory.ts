import { AiSearchRes } from '@/types/ai';
import mongoose, { Schema, Document, Model } from "mongoose";


export interface IAISearchHistory extends Document {
    userId: mongoose.Types.ObjectId,
    prompt: string
    answer: AiSearchRes
    createdAt: Date
}

const AiSearchFoodSchema = new Schema(
  {
    name: { type: String, required: true },
    calorie: { type: Number, required: true },
    protein: { type: Number, required: true },
    unit: { type: String, required: true }
  },
  { _id: false }
)

const UserAiSearchHistorySchema = new Schema<IAISearchHistory>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    prompt: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
        description: {
            type: String,
            required: true
        },
        foods: {
            type: [AiSearchFoodSchema],
            required: true
        }
    },
}, { timestamps: true })

const UserAiSearchHistoryModel: Model<IAISearchHistory> = mongoose.models.UserAiSearchHistory || mongoose.model<IAISearchHistory>('UserAiSearchHistory', UserAiSearchHistorySchema)

export default UserAiSearchHistoryModel