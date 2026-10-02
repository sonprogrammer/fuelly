'use client'

import { ReqMsgModal } from "@/app/components/ReqMsgModal";
import { useGetDailyMessage } from "@/hooks/useGetDailyMessage";
import { Sparkles } from "lucide-react";
import { useState } from "react";

export function HomeDailyCoach() {
    const [reqModalOpen, setReqModalOpen] = useState(false)
    const { data: fetchMsg, isPending: fetchingMsg } = useGetDailyMessage()

    const defaultMessage = "오늘의 작은 변화가 더 큰 성장을 만든다.\nNo matter what, just do it.";
    const displayMsg = fetchMsg?.answer ? fetchMsg.answer : defaultMessage
    return (
        <section className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                    </div>
                    <h2 className="text-sm font-semibold text-white">AI 코치의 오늘 한마디</h2>
                </div>
                {!fetchMsg || !fetchMsg.alreadyExist && (
                    <div>
                        <button
                            onClick={() => setReqModalOpen(true)}
                            className="text-purple-400 text-xs cursor-pointer hover:bg-purple-500/30 p-3 rounded-xl">
                            응원 요청하기
                        </button>
                        <p className="text-gray-300 text-[8px]">*일일 1회 요청가능합니다.</p>
                    </div>
                )}
            </div>
            <div className="space-y-2">
                <div className="p-4 bg-gray-800/50 rounded-xl mb-4">
                    <p className="text-white text-center whitespace-pre-line">
                        {fetchingMsg ? "불러오는 중..." : displayMsg}
                    </p>
                </div>


                {reqModalOpen &&

                    <ReqMsgModal
                        onClose={() => setReqModalOpen(false)}
                    />

                }

            </div>
        </section>
    )
}