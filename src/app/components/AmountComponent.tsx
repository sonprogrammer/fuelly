import React from "react";

interface Props {
    name: string;
    currentGrams: number;
    targetGrams: number;
    icon: React.ReactNode
    exceed: number
}

function AmountComponent({ currentGrams, targetGrams, name, icon }: Props) {
    const unit = name.includes("칼로리") ? "kcal" : "g"
    const current = Math.max(0, currentGrams)
    const percent = Math.min(100, Math.round((current / targetGrams) * 100))
    const remaining = targetGrams - currentGrams

    const barColor =
        percent >= 100 ? 'bg-red-500' :
            percent >= 75 ? 'bg-orange-400' :
                'bg-emerald-500'

    return (
        <div className="rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {icon}
                    <span className="text-sm font-semibold text-gray-300">{name}</span>
                </div>
                <span className="text-xs text-gray-600">{percent}%</span>
            </div>

            <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">
                    {current.toLocaleString()}
                    <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span>
                </span>
                <span className="text-xs text-gray-600">
                    목표 {targetGrams.toLocaleString()}{unit}
                </span>
            </div>

            <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                    className={`h-2 rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${percent}%` }}
                />
            </div>

            <p className="text-xs text-gray-500">
                {remaining > 0
                    ? <>남은 {name}: <span className="text-emerald-400 font-semibold">{remaining.toLocaleString()}{unit}</span></>
                    : <>목표 초과: <span className="text-red-400 font-semibold">+{Math.abs(remaining).toLocaleString()}{unit}</span></>
                }
            </p>
        </div>
    )
}

export default React.memo(AmountComponent);