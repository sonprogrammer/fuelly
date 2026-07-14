import mongoose, { Document, Schema, Types } from "mongoose";

export interface IDailyMsg extends Document {
    userId: Types.ObjectId;
    message : string;
    date: string;
    createdAt: Date;
}

const DailyMsgSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

DailyMsgSchema.index({userId: 1, date: 1}, {unique:  true})

export default mongoose.models.DailyMessage || mongoose.model<IDailyMsg>('DailyMessage', DailyMsgSchema)
//서버리스는 코드가 수정될때마다 디비 연결이 중복으로 생성되어 모델이 이미 존재한다는 에러가 발생해서 확인후 없다며 새로 만들어라임