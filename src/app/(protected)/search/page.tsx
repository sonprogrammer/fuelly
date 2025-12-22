'use client'

import { useState } from 'react'
import { Sparkles, Calendar, Database, Heart } from 'lucide-react'
import { Food } from '@/types/food'
import SearchGuide from '@/app/components/SearchGuide'
import usePostAiSearch from '@/hooks/usePostAiSearch'
import {useUserStore} from '@/store/userStore'
import {FixedUser } from '@/types/user'
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
    const {mutate: saveNomalFood} = usePostAddCustomFood()
    // *오늘 식단 저장훅
    const { mutate: saveDailyFoods} =usePostFoodToDailyMeal()    
    // * 나중에 먹을 음식 저장훅
    const { mutate: toggleSave } = useToggleSaveFood()
    // *저장한음식가져오는 훅
    const {data: savedFoods} = useGetSavedFood()
    // *ai로 부터 추천받은 음식 저장훅
    const { mutate: saveAiFood} = usePostAiFood()
    
    // *ai 응답 요청 훅 
    const { mutate: aiSearchMutate,data: result,error ,isPending: isAnalyzing, } = usePostAiSearch()



    const savedFoodMap = new Map<string, string>(
        savedFoods?.map((item: SavedFood) => [
            item.foodId.name,
            item.foodId._id
        ])
    )
    
    
    const handleSearch = () => {
        if (!inputValue.trim() || !user) return
        const userAndPrompt = {prompt: inputValue, user: user as FixedUser}
        aiSearchMutate(userAndPrompt,{
            onSuccess: () => {
                setInputValue('')
            },
            onError: () => {
                alert(error)
            }
        })

    }

    // !여기서 받는 타입에 따라 오늘 식단이나 일반 음식에 저장하기
    const handleSaveToDaily = (type: string, food: Food) => {
        if(type==='liked'){
            const savedFoodId = savedFoodMap.get(food?.name)

        if(!savedFoodId){
            saveAiFood({
                name: food.name,
                calorie: food.calorie,
                protein: food.protein,
                unit: food.unit
            },{
                onSuccess: () => toast.success('즐겨찾기에 저장되었습니다!')
            })
            return
        }
        toggleSave(savedFoodId,{
            onSuccess: () => toast.success('즐겨찾기에서 삭제되었습니다!')
        })
        }else if(type === 'daily'){
            saveDailyFoods(food, {onSuccess: () => {
                toast.success(`${food.name}이(가) 식단에 추가되었습니다!`)
            }})
        }else if(type === 'nomal'){
            saveNomalFood(food, {onSuccess: () => {
                toast.success(`${food.name}이(가) 새로운 음식이 등록되었습니다!`)
            }})
        }
    }


    return (
        <div className="relative h-full overflow-hidden">



            <div className="bg-gradient-animated absolute inset-0 z-0" />
            <div className="p-5 flex flex-col h-full gap-3 items-center relative z-10">
                <h1 className='text-3xl font-bold text-center my-10'>AI 한테 물어보세요</h1>

                <section className="flex gap-2 justify-center w-full">
                    <div
                        className="sm:w-[60%] w-[80%] rounded-2xl p-0.5
                    bg-linear-to-br from-green-300 via-blue-300 to-purple-300
                    bg-size-[300%_300%]
                    animate-gradient
                    transition-all duration-300
                  focus-within:from-green-200
                  focus-within:via-cyan-300
                  focus-within:to-blue-400
                    focus-within:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                    >

                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e)=> setInputValue(e.target.value)}
                            onKeyDown={(e)=> e.key === 'Enter' && handleSearch()}
                            className="w-full p-5 rounded-2xl bg-white outline-none"
                            placeholder="예: BBQ 황금올리브 치킨 한 마리, 나에게 맞는 식단 추천 해줘"
                        />
                    </div>

                    <button
                        aria-label='검색'
                        className=" bg-black flex items-center text-white p-5 px-8 rounded-2xl  cursor-pointer">
                        <Sparkles className="h-4 w-4 mr-2" />
                        {isAnalyzing ?
                            <span className="flex gap-1 text-lg">
                                <span className="animate-bounce [animation-delay:0ms]">.</span>
                                <span className="animate-bounce [animation-delay:150ms]">.</span>
                                <span className="animate-bounce [animation-delay:300ms]">.</span>
                            </span>
                            :
                            'AI 검색'}
                    </button>
                </section>

                {/* //! grok답변 나오는곳 */}
                <section className="backdrop-blur-lg bg-white/70 sm:w-[80%] w-[90%] shadow-md flex-1 rounded-xl p-5 overflow-y-auto">
                    {isAnalyzing && (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                            <div className="animate-pulse flex space-x-4">
                                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                    <div className="h-2 bg-slate-200 rounded"></div>
                                </div>
                            </div>
                            <p>AI가 영양 성분을 계산하고 있습니다...</p>
                        </div>
                    )}
                    {!result && !isAnalyzing && <SearchGuide />}
                    {result && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div>
                                <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-purple-500" /> AI의 분석 결과
                                </h2>
                                <p className="text-gray-700 leading-relaxed">{result.description}</p>
                            </div>

                            <div className="grid gap-4">
                                {result.foods.map((food: Food, idx: number) => (
                                    <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div>
                                            <h3 className="font-bold text-lg">{food.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                {food.unit} | {food.calorie}kcal | 단백질 {food.protein}g
                                            </p>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <button 
                                                aria-label='좋아요저장'
                                                onClick={() => handleSaveToDaily('liked', food)}
                                                className="flex flex-col cursor-pointer items-center p-2 hover:bg-pink-50 rounded-lg transition-colors group">
                                                <Heart className="w-5 h-5 text-pink-500 group-hover:fill-pink-500" />
                                                <span className="text-[10px] mt-1">좋아요</span>
                                            </button>
                                            <button 
                                                aria-label='식단추가'
                                                onClick={() => handleSaveToDaily('daily', food)}
                                                className="flex flex-col cursor-pointer items-center p-2 hover:bg-blue-50 rounded-lg transition-colors">
                                                <Calendar className="w-5 h-5 text-blue-500" />
                                                <span className="text-[10px] mt-1">식단추가</span>
                                            </button>
                                            <button 
                                                aria-label='일반음식 저장'
                                                onClick={() => handleSaveToDaily('nomal', food)}
                                                className="flex flex-col cursor-pointer items-center p-2 hover:bg-green-50 rounded-lg transition-colors">
                                                <Database className="w-5 h-5 text-green-500" />
                                                <span className="text-[10px] mt-1">음식저장</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                    }
                </section>
            </div>
        </div>

    )
}
