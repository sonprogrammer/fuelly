import { userInfoFromToken } from "@/lib/userInfoFromToken";
import UserAiSearchHistoryModel from "@/models/userAiSearchHistory";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userInfo = await userInfoFromToken(req)

        if (!userInfo) {
            return NextResponse.json({ message: '로그인이 필요합니다' }, { status: 401 })
        }

        const user = await userModel.findById(userInfo.objectId)

        if (!user) {
            return NextResponse.json({ message: '사용자 정보가 필요합니다' }, { status: 404 })
        }

        //TODO 우선은 보여주는건 10개만 보여주게 나중에 기능확장시 전체 보여주기 기능도 구현해보기
        const histories = await UserAiSearchHistoryModel.find({ userId: user._id }).sort({ createdAt: -1 }).limit(10)

        return NextResponse.json({ message: 'success', histories }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'internal server error' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const { answer, prompt } = await req.json()

        const userInfo = await userInfoFromToken(req)

        if (!userInfo) {
            return NextResponse.json({ message: '로그인이 필요합니다' }, { status: 401 })
        }

        const user = await userModel.findById(userInfo.objectId)

        if (!user) {
            return NextResponse.json({ message: '사용자 정보가 필요합니다' }, { status: 404 })
        }

        if (!answer || !prompt) {
            return NextResponse.json({ message: '받아온 데이터가 없습니다' }, { status: 400 })
        }

        const history = await UserAiSearchHistoryModel.create({
            userId: user._id,
            prompt,
            answer
        })


        return NextResponse.json({ message: 'success', history }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'internal server error' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {

        const { deletedId } = await req.json()
        console.log('daeteid', deletedId)
        const userInfo = await userInfoFromToken(req)

        if (!userInfo) {
            return NextResponse.json({ message: '로그인이 필요합니다' }, { status: 401 })
        }

        const user = await userModel.findById(userInfo.objectId)


        if (!user) {
            return NextResponse.json({ message: '사용자 정보가 필요합니다' }, { status: 404 })
        }

        if (!deletedId) {
            return NextResponse.json({ message: '삭제 기록이 없습니다' }, { status: 400 })
        }

        const deletedHistory = await UserAiSearchHistoryModel.findOneAndDelete({
            _id: deletedId,
            userId: user._id
        })

        if (!deletedHistory) {
            return NextResponse.json({ message: '검색 기록을 찾을 수 없습니다' }, { status: 404 })
        }


        return NextResponse.json({ message: 'success', }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'internal server error' }, { status: 500 })
    }
}