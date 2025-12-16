
export interface Food{
    name: string,
    calorie: number,
    protein: number,
    unit: string,
    _id: string

    //! 이건 서버에서 처리해주자 보안 때문에 - 그리 주용한 보안은 아니지만 습관화하기
    // createdBy: string
}