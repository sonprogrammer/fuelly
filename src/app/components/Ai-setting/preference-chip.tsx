'use client'

import { Plus, X } from 'lucide-react'
import { useState } from 'react'

interface PreferenceChipEditorProps {
    description: string
    suggestions: readonly string[]
    values: string[]
    onChange: (values: string[]) => void
    placeholder: string
}

export function PreferenceChipEditor({ description, suggestions, values, onChange, placeholder }: PreferenceChipEditorProps) {
    const [input, setInput] = useState('')

    const handleToggleSuggestion = (value: string) => {
        if (values.includes(value)) {
            onChange(values.filter(item => item !== value))
            return
        }

        onChange([...values, value])
    }

    const handleAdd = () => {
        const value = input.trim()

        if (!value || values.includes(value)) return

        onChange([...values, value])
        setInput('')
    }

    const handleRemove = (value: string) => {
        onChange(values.filter(item => item !== value))
    }

    return (
        <div>
            <p className="text-sm leading-relaxed text-gray-400">
                {description}
            </p>

            <div className="mt-5">
                <p className="mb-2 text-xs font-medium text-gray-500">
                    자주 선택하는 항목
                </p>

                <div className="flex flex-wrap gap-2">
                    {suggestions.map(item => {
                        const selected = values.includes(item)

                        return (
                            <button
                                key={item}
                                type="button"
                                onClick={() => handleToggleSuggestion(item)}
                                className={`cursor-pointer rounded-full border px-3 py-2 text-xs font-medium transition ${selected
                                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                                        : 'border-gray-800 bg-gray-900 text-gray-400 hover:border-gray-700 hover:text-white'
                                    }`}
                            >
                                {item}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="mt-5">
                <p className="mb-2 text-xs font-medium text-gray-500">
                    직접 입력
                </p>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                handleAdd()
                            }
                        }}
                        placeholder={placeholder}
                        className="min-w-0 flex-1 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-emerald-500"
                    />

                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={!input.trim()}
                        className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-emerald-500 text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-600"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {values.length > 0 && (
                <div className="mt-5">
                    <p className="mb-2 text-xs font-medium text-gray-500">
                        선택한 항목
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {values.map(item => (
                            <div
                                key={item}
                                className="flex items-center gap-1.5 rounded-full bg-gray-800 px-3 py-2 text-xs font-medium text-gray-200"
                            >
                                <span>{item}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemove(item)}
                                    className="cursor-pointer text-gray-500 transition hover:text-white"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}