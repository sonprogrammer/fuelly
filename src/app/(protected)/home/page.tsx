import { HomeHeader, HomeDailyCoach, HomeNutritionSummary } from "@/app/components/home-page"


export default function HomePage() {

    
    return (
        <div className="flex flex-col gap-5 p-5 md:p-8 max-w-5xl mx-auto min-h-full mb-10 sm:mb-0">
            <HomeHeader />

            <HomeNutritionSummary />

            <HomeDailyCoach />
        </div >

    )
}