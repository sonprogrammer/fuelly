'use client'

import { PolicyPageProps } from "@/app/components/policy-page/types";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function PolicyPage({ title, effectiveDate, sections }: PolicyPageProps) {
    const router = useRouter()

    return (
        <main className="mx-auto min-h-screen w-full max-w-3xl px-5 py-10 text-white">
            <section className="flex items-center relative justify-center  w-full border-b pb-6">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="absolute left-0 flex gap-2 text-sm text-gray-500 transition-colors hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    뒤로가기
                </button>
                <header className="text-center w-full">
                    <h1 className="text-2xl font-bold">{title}</h1>

                    <p className="mt-2 text-sm text-gray-500 text-end">
                        시행일: {effectiveDate}
                    </p>
                </header>
            </section>

            <div className="space-y-8 py-8">
                {sections.map((section) => (
                    <section key={section.title} className="space-y-3">
                        <h2 className="text-base font-semibold">
                            {section.title}
                        </h2>

                        <div className="space-y-3 text-sm leading-7 ">
                            {section.content.map((content, index) => (
                                <p key={index}>{content}</p>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    )
}