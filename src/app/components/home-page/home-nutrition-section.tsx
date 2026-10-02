'use client'

import AmountComponent from "@/app/components/AmountComponent"
import { ProgressBarSkeleton } from "@/app/components/ProgressBarSkeleton"
import useRemainNutrition from "@/hooks/useRemainNutrition"
import { useUserStore } from "@/store/userStore"
import { Beef, Flame } from "lucide-react"

export function HomeNutritionSummary() {
    const user = useUserStore(state => state.user)
    const { recommended, consumed, exceed, isPending } = useRemainNutrition(user)
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {isPending ? (
                    <>
                        <ProgressBarSkeleton />
                        <ProgressBarSkeleton />
                    </>
                )
                    : (
                        <>
                            <div className="bg-gray-900 rounded-2xl p-1 border border-gray-800 hover:border-gray-700 transition-colors">

                                <AmountComponent
                                    name='칼로리'
                                    targetGrams={recommended.calorie ?? 0}
                                    icon={<Flame className="h-5 w-5 text-orange-500" />}
                                    currentGrams={consumed.dailyCalorie}
                                    exceed={exceed.calorie}
                                />
                            </div>
                            <div className="bg-gray-900 rounded-2xl p-1 border border-gray-800 hover:border-gray-700 transition-colors">
                                <AmountComponent
                                    name='단백질'
                                    targetGrams={recommended.protein ?? 0}
                                    icon={<Beef className="h-5 w-5 text-red-500" />}
                                    currentGrams={consumed.dailyProtein}
                                    exceed={exceed.protein}
                                />
                            </div>
                        </>
                    )
                }
            </div >
    )
}