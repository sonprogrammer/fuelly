
interface SubmitBtnProps{
    submit: () => void
    isDisabled: boolean
    isPending: boolean
}

export function SubmitBtn({submit, isDisabled, isPending}: SubmitBtnProps) {
    return (
        <button
            type="button"
            onClick={submit}
            disabled={isDisabled}
            className="mt-5 w-full cursor-pointer rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed! disabled:bg-gray-800 disabled:text-gray-600"
        >
            {isPending ? '저장 중...' : '저장'}
        </button>
    )
}