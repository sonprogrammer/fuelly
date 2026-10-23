import dbConnect from "@/lib/mongoose";
import { userInfoFromToken } from "@/lib/userInfoFromToken";
import userModel from "@/models/userModel";
import { agreementReqSchema } from "@/schemas/user/userInfo/agreementReq";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest) {
    try {
        const userInfo = await userInfoFromToken(req)
        
        if (!userInfo) {
            return NextResponse.json({ message: 'user token required' }, { status: 401 })
        }
        
        const body: unknown = await req.json()
        
        const res = agreementReqSchema.safeParse(body)
        
        if(!res.success){
            return NextResponse.json({success: false, message: res.error.issues[0].message ?? '약관 목록이 올바르지 않습니다'},{status: 400} )
        }
        
        const { serviceImprovement} = res.data
        
        
        const now = new Date()
        
        await dbConnect()
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