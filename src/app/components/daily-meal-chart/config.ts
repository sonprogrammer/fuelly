export const PAGE_SIZE = 7

export const CHART_CONFIG = {
  calorie: {
    label: "칼로리",
    dataKey: "totalCalorie",
    unit: "kcal",
    barColor: "#10b981",
  },

  protein: {
    label: "단백질",
    dataKey: "totalProtein",
    unit: "g",
    barColor: "#3b82f6",
  },
} as const