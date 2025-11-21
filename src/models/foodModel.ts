import mongoose, {Schema, Document} from "mongoose";

export interface IFood extends Document{
    name: string; //음식이름
    protein: number; //단백질량 우선은 100그램기준임
    calories: number; //칼로리량 이것도 100그램기준
    createdBy?: string; //gpt추천이면 Null, 유저가 추가 하면 userId 
    //TODO createdBy는 나중에 삭제할지 보기
    createdAt: Date;
}

const FoodSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    protein: {
        type: String,
        required: true
    },
    calories: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Food || mongoose.model<IFood>('Food', FoodSchema)