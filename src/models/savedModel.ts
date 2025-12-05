import mongoose, {Schema, Document} from "mongoose";

export interface ISaved extends Document{
    name: string; //음식이름
    protein: number; //단백질량 우선은 
    calories: number; //칼로리량 이것도
    amount: string; //그램당이 될수도 있고 갯수일수도 있고
    createdBy?: string; //gpt추천이면 Null, 유저가 추가 하면 userId 
    //TODO createdBy는 나중에 삭제할지 보기
    createdAt: Date;
}

const SavedSchema: Schema = new Schema({
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
    amount: {
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

export default mongoose.models.Saved || mongoose.model<ISaved>('Food', SavedSchema)