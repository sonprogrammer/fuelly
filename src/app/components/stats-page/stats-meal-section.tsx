import FoodRecordComponent from "@/app/components/FoodRecordComponent";
import { GroupedMealData, StatsMealsSectionProps } from "@/app/components/stats-page/types";

export function StatsMealsSection({ isPendingMeal, range, setRange, filteredData, CAL_LIMIT, PRO_LIMIT }: StatsMealsSectionProps) {
    return (
        <>
            <section className="px-5">
                <div className="inline-flex gap-1 rounded-2xl bg-emerald-50 p-1.5">
                    {([7, 30] as const).map(days => (
                        <button
                            key={days}
                            type="button"
                            aria-pressed={range === days}
                            onClick={() => setRange(days)}
                            className={`cursor-pointer rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${range === days
                                    ? "bg-emerald-500 text-white shadow-sm"
                                    : "text-emerald-700 hover:bg-emerald-100"
                                }`}
                        >
                            최근 {days}일
                        </button>
                    ))}
                </div>
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