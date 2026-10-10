'use client'

import {  GoalEditBtnProps } from "@/app/components/goal/types"


export function GoalEditBtn({ edit, value }: GoalEditBtnProps) {
    return (

            <button
                type="button"
                onClick={edit}
                className="flex w-full cursor-pointer items-center justify-center px-5 py-4 transition hover:bg-gray-900"
            >
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{value}</span>
                </div>
            </button>

    )
}