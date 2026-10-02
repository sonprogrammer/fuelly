import mongoose, { Schema, Document } from "mongoose";

interface IPolicyAgreement {
    version: string;
    agreed: boolean;
    agreedAt?: Date;
}

interface IUserPolicy {
    terms?: IPolicyAgreement;
    privacy?: IPolicyAgreement;
    serviceImprovement?: IPolicyAgreement;
}
export interface IUser extends Document {
    nickName?: string; //일반회원일 때
    password?: string; //일반회원일 때
    kakaoId?: string; //카카오일때
    name?: string; //카카오 일때
    height?: number;
    weight?: number;
    age?: number;
    birthDate?: Date
    gender?: 'male' | 'female';
    activity?: 'sedentary' | 'light' | 'moderate' | 'active';
    goal?: 'bulk' | 'diet' | 'maintain';
    createdAt: Date;
    policy?: IUserPolicy;
}

const PolicyAgreementSchema = new Schema(
    {
        version: {
            type: String,
            required: true,
        },
        agreed: {
            type: Boolean,
            required: true,
        },
        agreedAt: {
            type: Date,
            default: null,
        },
    },
    {
        _id: false,
    }
);

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
    age: {
        type: Number
    },
    birthDate: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    goal: {
        type: String,
        enum: ['bulk', 'diet'],
    },
    activity: {
        type: String,
        enum: ['sedentary', 'light', 'moderate', 'active'],
    },
    policy: {
        terms: {
            type: PolicyAgreementSchema,
            required: false,
        },

        privacy: {
            type: PolicyAgreementSchema,
            required: false,
        },

        serviceImprovement: {
            type: PolicyAgreementSchema,
            required: false,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)