'use client'

import { SavedFood } from "@/app/components/save-page/types";
import { SearchInputSection } from "@/app/components/search-page/search-input-section";
import { SearchResultSection } from "@/app/components/search-page/search-result-section";
import useGetSavedFood from "@/hooks/useGetSavedFood";
import usePostAddCustomFood from "@/hooks/usePostAddCustomFood";
import usePostAiFood from "@/hooks/usePostAiFood";
import usePostAiSearch from "@/hooks/usePostAiSearch";
import usePostFoodToDailyMeal from "@/hooks/usePostFoodToDailyMeal";
import useToggleSaveFood from "@/hooks/useToggleSaveFood";
import { useUserStore } from "@/store/userStore";
import { Food } from "@/types/food";
import toast from "react-hot-toast";

export function AISearchSection(){


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
    const { mutateAsync: aiSearch, data: result, isPending: isAnalyzing, } = usePostAiSearch()



    const savedFoodMap = new Map<string, string>(
        savedFoods?.map((item: SavedFood) => [
            item.foodId.name,
            item.foodId._id
        ])
    )


    const handleSearch = async(userPrompt: string):Promise<boolean> => {
        const prompt = userPrompt.trim()

        if(!user){
            toast.error('로그인을 다시 해주세요')
            return false
        }
        if(!prompt){
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
            await aiSearch(prompt)
            return true
        } catch (error) {
            toast.error('서버 오류, 다시 시도해 주세요.')
            console.error(error)
            return false
        }

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
    
    return(
        <>
            <SearchInputSection isAnalyzing={isAnalyzing} onSearch={handleSearch}/>
            <SearchResultSection addToDaily={handleSaveToDaily} result={result} isAnalyzing={isAnalyzing} />
        </>
    )
}