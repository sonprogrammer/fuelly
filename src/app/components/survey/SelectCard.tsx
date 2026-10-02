import { Check } from "lucide-react"

interface SelectCardProps {
    selected: boolean
    title: string
    description?: string
    onClick: () => void
}

export function SelectCard({ selected, title, description, onClick }: SelectCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition-all ${selected ? "border-emerald-500 bg-emerald-500/10" : "border-gray-800 bg-gray-800 hover:border-gray-700"}`}
        >
            <div>
                <p className={`text-sm font-semibold ${selected ? "text-emerald-400" : "text-white"}`}>{title}</p>
                {description && <p className="mt-1 text-xs text-gray-500">{description}</p>}
            </div>
            <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? "border-emerald-500 bg-emerald-500" : "border-gray-600"}`}>
                {selected && <Check className="h-3 w-3 text-white" />}
            </div>
        </button>
    )
}