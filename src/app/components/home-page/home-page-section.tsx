'use client'

import BirthDateModal from "@/app/components/home-page/birth-modal";
import { HomeDailyCoach } from "@/app/components/home-page/home-dailycoach-section";
import { HomeHeader } from "@/app/components/home-page/home-header";
import { HomeNutritionSummary } from "@/app/components/home-page/home-nutrition-section";
import { useUserStore } from "@/store/userStore";



export function HomePageSection() {
    const user = useUserStore(state => state.user)
    
    const showBirthModal = !!user && !user.birthDate

    return (
        <>
            <div className="flex flex-col gap-5 p-5 md:p-8 max-w-5xl mx-auto min-h-full mb-10 sm:mb-0">
                <HomeHeader />

                <HomeNutritionSummary />

                <HomeDailyCoach />
            </div >
            {showBirthModal && <BirthDateModal />}
        </>
    )
}