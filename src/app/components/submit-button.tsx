
interface SubmitBtnProps{
    submit: () => void
    isDisabled: boolean
    isPending: boolean
    pendingText?: string
    defaultText?: string
    icon?: React.ReactNode
}

export function SubmitBtn({submit, isDisabled, isPending, pendingText='저장 중...', defaultText='저장', icon}: SubmitBtnProps) {
    return (
        <button
            type="button"
            onClick={submit}
            disabled={isDisabled}
            className="flex gap-2 items-center justify-center mt-5 w-full cursor-pointer rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white transition active:scale-[0.98]
             hover:bg-emerald-400 disabled:cursor-not-allowed! disabled:bg-gray-800 disabled:text-gray-600"
        >
            {icon && (
                <span className={isPending ? 'animate-pulse' : ''}>
                    {icon}
                </span>
            )}
            {isPending ? pendingText : defaultText}
        </button>
    )
}