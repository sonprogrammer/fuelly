

interface ShareDailyMealParams {
    shareId: string
    totalCalorie: number
    totalProtein: number
}

export function shareMealToKakao({ shareId, totalCalorie, totalProtein }: ShareDailyMealParams) {
    if (typeof window === "undefined" || !window.Kakao) {
        throw new Error("Kakao SDK가 로드되지 않았습니다.")
    }

    const shareUrl = `${window.location.origin}/share/meal/${shareId}`



    window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
            title: "오늘의 Fuelly 식단",
            description: `${totalCalorie.toLocaleString()} kcal · 단백질 ${totalProtein}g`,
            imageUrl: `${window.location.origin}/favicon.png`,
            link: {
                mobileWebUrl: shareUrl,
                webUrl: shareUrl
            }
        },
        buttons: [
            {
                title: "식단 자세히 보기",
                link: {
                    mobileWebUrl: shareUrl,
                    webUrl: shareUrl
                }
            }
        ]
    })
}