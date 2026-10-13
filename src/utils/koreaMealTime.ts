const koreaHour = Number(new Intl.DateTimeFormat('ko-KR', {
            timeZone: 'Asia/Seoul',
            hour: '2-digit',
            hour12: false
        }).format(new Date())
        )

export const mealTime =
            koreaHour >= 5 && koreaHour < 11
                ? '아침'
                : koreaHour >= 11 && koreaHour < 15
                    ? '점심'
                    : koreaHour >= 15 && koreaHour < 17
                        ? '간식'
                        : koreaHour >= 17 && koreaHour < 23
                            ? '저녁'
                            : '야식'