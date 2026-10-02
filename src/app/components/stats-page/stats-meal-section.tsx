import FoodRecordComponent from "@/app/components/FoodRecordComponent";
import { GroupedMealData, StatsMealsSectionProps } from "@/app/components/stats-page/types";

export function StatsMealsSection({ isPendingMeal, range, setRange, filteredData, CAL_LIMIT, PRO_LIMIT }: StatsMealsSectionProps) {
    return (
        <>
            <section className="flex gap-3 pl-5">
                <button
                    className={`px-4 py-2 rounded-lg border ${range === 7 ? "bg-blue-600 text-white" : "bg-white"} cursor-pointer`}
                    onClick={() => setRange(7)}
                >
                    최근 7일
                </button>

                <button
                    className={`px-4 py-2 rounded-lg border ${range === 30 ? "bg-blue-600 text-white" : "bg-white"} cursor-pointer`}
                    onClick={() => setRange(30)}
                >
                    최근 30일
                </button>
            </section>


            {isPendingMeal ? (
                <div className="py-12 text-center text-gray-500 animate-pulse">
                    식단 기록 불러오는 중...
                </div>
            ) : (
                <section className={filteredData.length > 0 ? "grid grid-cols-1 sm:grid-cols-2 gap-3 py-8" : ""}>
                    {filteredData.length > 0 ? (
                        filteredData?.map((dailyData: GroupedMealData) => (
                            <FoodRecordComponent
                                key={dailyData.date}
                                dailyData={[dailyData]}
                                CAL_LIMIT={CAL_LIMIT}
                                PRO_LIMIT={PRO_LIMIT}
                            />
                        ))
                    ) : (
                        <section className="items-center">
                            <p className='text-gray-400 text-center p-5'>
                                해당 날짜 기록이 없습니다.
                            </p>
                        </section>
                    )}
                </section>
            )}
        </>
    )
}