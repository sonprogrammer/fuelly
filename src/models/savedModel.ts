import mongoose, {Schema,Types, Document} from "mongoose"

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