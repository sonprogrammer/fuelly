import { ChartHeaderProps } from "./types"

export function ChartHeader({ metric, average, target, unit, percentage, onMetricChange }: ChartHeaderProps) {
    return (
        <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
                <p className="text-xs font-medium text-gray-500">
                    평균 섭취량
                </p>

                <div className="mt-1 flex items-end gap-2">
                    <strong className="text-3xl font-bold text-white">
                        {average.toLocaleString()}
                    </strong>

                    <span className="pb-1 text-sm font-medium text-gray-500">
                        {unit}
                    </span>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                    목표 {target.toLocaleString()}
                    {unit} 대비{" "}
                    <span className={percentage > 100 ? "font-semibold text-red-400" : "font-semibold text-emerald-400"}>
                        {percentage}%
                    </span>
                </p>
            </div>

            <div className="flex w-fit rounded-xl bg-gray-800 p-1">
                <button
                    type="button"
                    onClick={() => onMetricChange("calorie")}
                    className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${metric === "calorie"
                            ? "bg-emerald-500 text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                >
                    칼로리
                </button>

                <button
                    type="button"
                    onClick={() => onMetricChange("protein")}
                    className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${metric === "protein"
                            ? "bg-blue-500 text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                >
                    단백질
                </button>
            </div>
        </div>
    )
}