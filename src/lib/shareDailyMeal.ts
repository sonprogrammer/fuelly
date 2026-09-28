import { shareMealToKakao } from "@/lib/kakaoShare"
import { GroupFoodsArrayType } from "@/types/food"


interface ShareDailyMealParams {
    foods: GroupFoodsArrayType[]
    totalCalorie: number
    totalProtein: number
    createSharedMeal: (data: {
        meals: GroupFoodsArrayType[]
        totalCalorie: number
        totalProtein: number
    }, options: {
        onSuccess: (data: { shareId: string }) => void
        onError: () => void
    }) => void
    onError: (message: string) => void
}

export function shareDailyMeal({
    foods,
    totalCalorie,
    totalProtein,
    createSharedMeal,
    onError
}: ShareDailyMealParams) {
    if (foods.length === 0) {
        onError("공유할 식단이 없습니다.")
        return
    }

    createSharedMeal({
        meals: foods,
        totalCalorie,
        totalProtein
    }, {
        onSuccess: data => {
            try {
                shareMealToKakao({shareId: data.shareId,totalCalorie,totalProtein})
            } catch(error) {
                console.error(error)
                onError("카카오톡 공유를 불러오지 못했습니다.")
            }
        },
        onError: () => {
            onError("식단 공유 생성에 실패했습니다.")
        }
    })
}