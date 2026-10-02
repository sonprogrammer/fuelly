import { TooltipProps } from "./types"
import { format, parseISO } from "date-fns"

export function NutritionTooltip({ active, payload, label, unit }: TooltipProps) {
    if (!active || !payload || payload.length === 0 || !label) {
        return null
    }

    const value = payload[0]?.value

    const formattedDate = format(parseISO(label), "yyyy년 M월 d일")

    return (
        <div className="rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 shadow-xl">
            <p className="mb-1 text-xs text-gray-500">
                {formattedDate}
            </p>

            <p className="text-sm font-bold text-white">
                {value?.toLocaleString()}
                {unit}
            </p>
        </div>
    )
}