import mongoose, {Schema,Types, Document} from "mongoose";


//TODO 이건 foodModel에서 가져와도 될것 같아 피룡없어 보임 추후에 확인해보기

export interface ISaved extends Document{
    savedUser: Types.ObjectId;
    foodId: Types.ObjectId;
    createdAt: Date;
}

const SavedSchema: Schema = new Schema({
    savedUser: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    foodId: {
        type: Schema.Types.ObjectId,
        ref: 'Food',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Saved || mongoose.model<ISaved>('Saved', SavedSchema)