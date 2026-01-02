'use client'

import { useState } from 'react'
import { Sparkles, Calendar, Database, Heart } from 'lucide-react'
import { Food } from '@/types/food'
import SearchGuide from '@/app/components/SearchGuide'
import usePostAiSearch from '@/hooks/usePostAiSearch'
import { useUserStore } from '@/store/userStore'
import { FixedUser } from '@/types/user'
import usePostFoodToDailyMeal from '@/hooks/usePostFoodToDailyMeal'
import useToggleSaveFood from '@/hooks/useToggleSaveFood'
import usePostAddCustomFood from '@/hooks/usePostAddCustomFood'
import useGetSavedFood from '@/hooks/useGetSavedFood'
import usePostAiFood from '@/hooks/usePostAiFood'
import { toast } from 'react-hot-toast'


interface SavedFood {
    _id: string;
    savedUser: string
    foodId: Food
}


export default function AISearchPage() {
    const [inputValue, setInputValue] = useState<string>('')


    const user = useUserStore(state => state.user)

    // *일반음식저장훅
    const { mutate: saveNomalFood } = usePostAddCustomFood()
    // *오늘 식단 저장훅
    const { mutate: saveDailyFoods } = usePostFoodToDailyMeal()
    // * 나중에 먹을 음식 저장훅
    const { mutate: toggleSave } = useToggleSaveFood()
    // *저장한음식가져오는 훅
    const { data: savedFoods } = useGetSavedFood()
    // *ai로 부터 추천받은 음식 저장훅
    const { mutate: saveAiFood } = usePostAiFood()

    // *ai 응답 요청 훅 
    const { mutate: aiSearchMutate, data: result, isPending: isAnalyzing, } = usePostAiSearch()



    const savedFoodMap = new Map<string, string>(
        savedFoods?.map((item: SavedFood) => [
            item.foodId.name,
            item.foodId._id
        ])
    )


    const handleSearch = () => {
        if (!inputValue.trim() || !user) return
        const userAndPrompt = { prompt: inputValue, user: user as FixedUser }
        aiSearchMutate(userAndPrompt, {
            onSuccess: () => {
                setInputValue('')
            },
            onError: () => {
                toast.error('error')
            }
        })

    }

    // !여기서 받는 타입에 따라 오늘 식단이나 일반 음식에 저장하기
    const handleSaveToDaily = (type: string, food: Food) => {
        if (type === 'liked') {
            const savedFoodId = savedFoodMap.get(food?.name)

            if (!savedFoodId) {
                saveAiFood({
                    name: food.name,
                    calorie: food.calorie,
                    protein: food.protein,
                    unit: food.unit
                }, {
                    onSuccess: () => toast.success('즐겨찾기에 저장되었습니다!')
                })
                return
            }
            toggleSave(savedFoodId, {
                onSuccess: () => toast.success('즐겨찾기에서 삭제되었습니다!')
            })
        } else if (type === 'daily') {
            saveDailyFoods(food, {
                onSuccess: () => {
                    toast.success(`${food.name}이(가) 식단에 추가되었습니다!`)
                }
            })
        } else if (type === 'nomal') {
            saveNomalFood(food, {
                onSuccess: () => {
                    toast.success(`${food.name}이(가) 새로운 음식이 등록되었습니다!`)
                }
            })
        }
    }


    return (
        <div className="relative h-full overflow-hidden flex flex-col items-center">



            <div className="bg-gradient-animated absolute inset-0 z-0" />
            <div className="p-5 flex flex-col h-full gap-3 max-w-4xl items-center relative z-10">
                <header className="pt-8 pb-6 sm:pt-12 sm:pb-10 shrink-0">
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-center bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
                        AI 식단 가이드
                    </h1>
                    <p className="text-center text-gray-500 mt-2 text-sm sm:text-base">
                        무엇을 드셨나요? AI가 영양 성분을 분석해 드립니다.
                    </p>
                </header>

                <section className="w-full flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1 group">
                        <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition-opacity" />
                        <div className="relative flex items-center bg-white rounded-2xl border border-gray-100 shadow-sm focus-within:border-blue-300 transition-all">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                className="w-full p-4 sm:p-5 rounded-2xl outline-none text-sm sm:text-base"
                                placeholder="예: BBQ 황금올리브 치킨 한 마리, 나에게 맞는 식단 추천 해줘"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSearch}
                        disabled={isAnalyzing}
                        className="h-14 sm:h-auto bg-black text-white px-8 rounded-2xl font-bold flex items-center justify-center hover:bg-zinc-800 transition-all active:scale-95 disabled:bg-gray-400"
                    >
                        {isAnalyzing ? (
                            <div className="flex gap-1 items-center">
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                        ) : (
                            <>
                                <Sparkles className="h-4 w-4 mr-2" />
                                <span className="whitespace-nowrap">분석하기</span>
                            </>
                        )}
                    </button>
                </section>

                {/* //! grok답변 나오는곳 */}
                <section className="flex-1 min-h-0 mb-6 flex flex-col">
                    <div className="flex-1 backdrop-blur-md bg-white/80 rounded-3xl border border-white shadow-xl overflow-hidden flex flex-col">
                        <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
                            {isAnalyzing && (
                                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                    <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin" />
                                    <p className="font-medium text-gray-600 animate-pulse">AI 분석관이 데이터를 확인 중입니다...</p>
                                </div>
                            )}

                            {!result && !isAnalyzing && <SearchGuide />}

                            {result && (
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
                                        {result.foods.map((food: Food, idx: number) => (
                                            <div
                                                key={idx}
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
                                                            onClick={() => handleSaveToDaily(btn.type, food)}
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
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>

    )
}
