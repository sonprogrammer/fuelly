
export interface Food{
    name: string;
    calorie: number;
    protein: number;
    unit: string;
    _id?: string
    createdBy?: string
    foodId?: string;
}

export type GroupFoodsArrayType = Food & { quantity: number}