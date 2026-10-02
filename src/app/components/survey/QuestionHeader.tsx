interface QuestionHeaderProps {
    title: string
    description: string
}

export function QuestionHeader({ title, description }: QuestionHeaderProps) {
    return (
        <div>
            <h1 className="text-xl font-bold leading-snug text-white">{title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
        </div>
    )
}