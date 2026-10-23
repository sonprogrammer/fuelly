'use client'


import { AiSearchHistoryChips } from "@/app/components/search-page/history-search-chips";
import { AiSearchHistoryPanel } from "@/app/components/search-page/history-search-panel";
import { SearchInputSection } from "@/app/components/search-page/search-input-section";
import { SearchLoading } from "@/app/components/search-page/search-loading";
import { SearchResultSection } from "@/app/components/search-page/search-result-section";
import SearchGuide from "@/app/components/SearchGuide";
import { useDeleteUserAiHistory } from "@/hooks/useDeleteUserAiHistory";
import useGetSavedFood from "@/hooks/useGetSavedFood";
import { useGetUserAiHistory } from "@/hooks/useGetUserAiHistory";
import usePostAddCustomFood from "@/hooks/usePostAddCustomFood";
import usePostAiFood from "@/hooks/usePostAiFood";
import usePostAiSearch from "@/hooks/usePostAiSearch";
import usePostFoodToDailyMeal from "@/hooks/usePostFoodToDailyMeal";
import { usePostUserAiHistory } from "@/hooks/usePostUserAiHistory";
import useRemainNutrition from "@/hooks/useRemainNutrition";
import useToggleSaveFood from "@/hooks/useToggleSaveFood";
import { useUserStore } from "@/store/userStore";
import { AiFood } from "@/types/ai";
import { SavedFood } from "@/types/food";
import { useState } from "react";
import toast from "react-hot-toast";


export function AISearchSection() {
    const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null)
    const [historyOpen, setHistoryOpen] = useState(false)

    const user = useUserStore(state => state.user)
    const { remain } = useRemainNutrition(user)
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
    const { mutateAsync: aiSearch, data: result, isPending: isAnalyzing, } = usePostAiSearch()

    // *ai search history
    const { data: searchHistory = [], isPending: isHistoryLoading } = useGetUserAiHistory(user?._id)

    // * upload ai search history
    const { mutate: postHistory } = usePostUserAiHistory(user?._id)

    //* delte ai search history
    const { mutate: deleteHistory, isPending: deletingHistory } = useDeleteUserAiHistory(user?._id)

    const selectedHistory = searchHistory.find(item => item._id === selectedHistoryId)
    const displayRes = selectedHistory?.answer ?? result



    const findSavedFood = (food: AiFood) => {
        return savedFoods?.find((item: SavedFood) => {
            const savedFood = item.food
            return savedFood != null &&
                savedFood.name === food.name &&
                savedFood.unit === food.unit &&
                savedFood.calorie === food.calorie &&
                savedFood.protein === food.protein
        })
    }


    const handleSearch = async (userPrompt: string): Promise<boolean> => {
        const prompt = userPrompt.trim()

        if (!user) {
            toast.error('로그인을 다시 해주세요')
            return false
        }
        if (!prompt) {
            toast.error('내용을 입력해주세요')
            return false
        }
        if (prompt.length < 2) {
            toast.error('조금 더 구체적으로 입력해주세요.')
            return false
        }

        if (prompt.length > 100) {
            toast.error('100자 이내로 입력해주세요.')
            return false
        }

        try {
            const answer = await aiSearch({ prompt, remain })
            postHistory({ prompt, answer })

            setSelectedHistoryId(null)

            return true
        } catch (error) {
            console.error(error)
            return false
        }

    }

    const handleToggleSave = (food: AiFood) => {
        const savedFood = findSavedFood(food)?.food
        if (savedFood) {
            toggleSave(savedFood._id, {
                onSuccess: () => {
                    toast.success('즐겨찾기에서 삭제되었습니다!')
                }
            })
            return
        }
        saveAiFood(food, {
            onSuccess: () => {
                toast.success('즐겨찾기에 저장되었습니다!')
            }
        })
    }

    const handleAddToDaily = (food: AiFood) => {
        saveDailyFoods({
            name: food.name,
            calorie: food.calorie,
            protein: food.protein,
            unit: food.unit
        }, {
            onSuccess: () => {
                toast.success(`${food.name}이(가) 식단에 추가되었습니다!`)
            }
        })
    }

    const handleSaveNomal = (food: AiFood) => {
        saveNomalFood(food, {
            onSuccess: () => {
                toast.success(`${food.name}이(가) 새로운 음식으로 등록되었습니다!`)
            }
        })
    }

    return (
        <>
            <div className=" flex justify-end">
                <AiSearchHistoryPanel
                    histories={searchHistory}
                    open={historyOpen}
                    isLoading={isHistoryLoading}
                    isDeleting={deletingHistory}
                    onSelect={setSelectedHistoryId}
                    onDelete={deleteHistory}
                    onClose={() => setHistoryOpen(false)}
                />
            </div>

            <section className='w-full md:w-[90%] flex flex-col gap-3'>


                <SearchInputSection isAnalyzing={isAnalyzing} onSearch={handleSearch} />

                {!isHistoryLoading && searchHistory.length > 0 && (

                    <AiSearchHistoryChips
                        histories={searchHistory}
                        onSelect={setSelectedHistoryId}
                        onOpenAll={() => setHistoryOpen(true)}
                    />
                )}
            </section>

            {!displayRes && !isAnalyzing && <SearchGuide />}
            {isAnalyzing && <SearchLoading />}
            {displayRes && !isAnalyzing && (
                <SearchResultSection
                    onToggleSave={handleToggleSave}
                    onAddToDaily={handleAddToDaily}
                    onSaveNomal={handleSaveNomal}
                    isFoodSaved={food => findSavedFood(food) !== undefined}
                    result={displayRes} />
            )}
        </>
    )
}