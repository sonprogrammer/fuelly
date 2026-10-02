import { QuestionHeader } from "@/app/components/survey/QuestionHeader"

interface NumberQuestionProps {
    title: string
    description: string
    value: number | null
    unit: string
    placeholder: string
    onChange: (value: number | null) => void
}

export function NumberQuestion({ title, description, value, unit, placeholder, onChange }: NumberQuestionProps) {
    return (
        <div>
            <QuestionHeader title={title} description={description} />
            <div className="relative mt-10">
                <input
                    type="number"
                    inputMode="numeric"
                    value={value ?? ""}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
                    className="w-full border-b-2 border-gray-700 bg-transparent px-3 py-5 pr-16 text-center text-4xl font-bold text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-500"
                    autoFocus
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">{unit}</span>
            </div>
        </div>
    )
}