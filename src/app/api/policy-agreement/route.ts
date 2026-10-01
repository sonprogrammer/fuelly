import dbConnect from "@/lib/mongoose";
import { userInfoFromToken } from "@/lib/userInfoFromToken";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

interface AgreementBody {
    termsOfService: boolean;
    privacyPolicy: boolean;
    serviceImprovement: boolean;
}

export async function PATCH(req: NextRequest) {
    try {
        await dbConnect()
        const userInfo = await userInfoFromToken(req)

        if (!userInfo) {
            return NextResponse.json({ message: 'user token required' }, { status: 401 })
        }

        const { termsOfService, privacyPolicy, serviceImprovement }: AgreementBody = await req.json()

        if (!termsOfService || !privacyPolicy) {
            return NextResponse.json({ success: false, message: '필수 약관 동의해주세요' }, { status: 400 })
        }

        const now = new Date()
        
        const user = await userModel.findByIdAndUpdate(
            userInfo.objectId,
            {
                $set: {
                    "policy.terms": {
                        agreed: true,
                        agreedAt: now,
                    },

                    "policy.privacy": {
                        agreed: true,
                        agreedAt: now,
                    },

                    "policy.serviceImprovement": {
                        agreed: serviceImprovement,
                        agreedAt: serviceImprovement ? now : null,
                    },
                },
            },
            {
                new: true,
            }
        )


        if(!user){
            return NextResponse.json({success: false, message:'사용자를 찾을 수 없습니다'}, {status: 404})
        }

        return NextResponse.json({success: true, message:'약관 동의 완료'}, {status: 200})

    } catch (error) {
        console.error('policy agree error', error)
        return NextResponse.json({success: false, message:'internal server error'}, {status: 500})
    }
}