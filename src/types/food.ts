
//음식 문서에저장 안되었을시
export interface FoodInfo{
    name: string;
    calorie: number;
    protein: number;
    unit: string;
}
//음식 문서에 저장되었을시
export interface Food extends FoodInfo {
    _id: string
    createdBy?: string
    createdAt: string
}

//음식 문서에 있는걸 저장하는거니깐 ai한테 받은것도 다 음식문서에 저장됨 -> id생김
export interface SavedFood {
    _id: string;//savedFood문서의 id
    savedUser: string;
    food: Food
}

export interface GetSaveFoodRes extends SavedFood{
    createdAt: string
}