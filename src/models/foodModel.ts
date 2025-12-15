import mongoose, {Schema, Document} from "mongoose";

// ! 일반 음식추가에 들어갈 모델, saved컬럼으로 saved페이지에서 나중에 먹을 음식 추가 가능 ==> 결국 음식마다 값이 밑에 컬럼들이 들어간다 생각하면됨 
export interface IFood extends Document{
    name: string; //음식이름
    protein: number; 
    calorie: number; 
    createdBy?: string; //*gpt추천이면 Null, 유저가 추가 하면 userId  -> 이게 필요가 있나 싶음 우선 keep해놓자
    unit: string;
    //TODO createdBy는 나중에 삭제할지 보기
    saved: boolean;
    createdAt: Date;
}

const FoodSchema: Schema = new Schema({
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
    createdBy: {
        type: String,
    },
    saved:{
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Food || mongoose.model<IFood>('Food', FoodSchema)