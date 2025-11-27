import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document{
    nickName?: string; //일반회원일 때
    password?: string; //일반회원일 때
    kakaoId?: string; //카카오일때
    name?: string; //카카오 일때
    height?: number;
    weight?: number;
    goal?: 'bulk' | 'diet' | 'maintain';
    createdAt: Date;
}

const UserSchema: Schema = new Schema({
    nickName: {
        type: String,
        unique: true,
        sparse: true
    },
    password: {
        type: String,
    },
    kakaoId: {
        type: String,
        unique: true,
        sparse: true
    },
    name: {
        type: String,
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    goal: {
        type: String,
        enum: ['bulk', 'diet'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)