
import { AiFood, AiSearchRes } from "@/types/ai";
import { Food } from "@/types/food";
import { Calendar, Database, Heart, Sparkles } from "lucide-react";

interface SearchResultSectionProps {
    result: AiSearchRes
    addToDaily: (type: string, food: Food) => void
}


export function SearchResultSection({ result, addToDaily }: SearchResultSectionProps) {
    return (
        <section className="mb-6 flex flex-col min-w-[90%]">
            <div className="backdrop-blur-md bg-white/80 rounded-3xl border border-white shadow-xl overflow-hidden flex flex-col">
                <div className="p-4 sm:p-8 custom-scrollbar">

                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                            <h2 className="text-lg font-bold mb-2 flex items-center gap-2 text-blue-800">
                                <Sparkles className="w-5 h-5" /> AI 영양 코멘트
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                {result.description}
                            </p>
                        </div>

                        <div className="grid gap-4">
                            {result.foods.map((food: AiFood) => (
                                <div
                                    key={food.name}
                                    className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                                >
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-gray-900 text-lg">{food.name}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium">{food.unit}</span>
                                            <span className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-xs font-bold">{food.calorie}kcal</span>
                                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-bold">단백질 {food.protein}g</span>
                                        </div>
                                    </div>

                                    <div className="flex w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 gap-1 justify-between sm:justify-end">
                                        {[
                                            { icon: Heart, label: '좋아요', color: 'text-pink-500', type: 'liked', bg: 'hover:bg-pink-50' },
                                            { icon: Calendar, label: '식단추가', color: 'text-blue-500', type: 'daily', bg: 'hover:bg-blue-50' },
                                            { icon: Database, label: '음식저장', color: 'text-green-500', type: 'nomal', bg: 'hover:bg-green-50' }
                                        ].map((btn) => (
                                            <button
                                                key={btn.type}
                                                onClick={() => addToDaily(btn.type, food)}
                                                className={`flex-1 sm:flex-none flex flex-col items-center p-2 px-3 ${btn.bg} rounded-xl transition-all active:scale-90 group`}
                                            >
                                                <btn.icon className={`w-5 h-5 ${btn.color} ${btn.type === 'liked' ? 'group-hover:fill-current' : ''}`} />
                                                <span className="text-[10px] mt-1 font-medium text-gray-500">{btn.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="mt-3 text-center text-xs text-gray-500">
                        * AI 추천 정보는 참고용이며 실제 영양정보와 차이가 있을 수 있습니다.
                    </p>
                </div>
            </div>
        </section>
    )
}