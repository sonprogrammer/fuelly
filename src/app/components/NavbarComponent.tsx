'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Utensils, Star, Heart, AudioWaveform, ChartColumnBig } from 'lucide-react';


export default function NavbarComponent() {
    const pathname = usePathname()

    const currentPage = (path: string) => pathname === `/${path}`

    return (
        <section className='flex justify-around h-full'>
            <Link 
                className={`p-3 flex-1 text-center flex flex-col items-center 
                    hover:bg-amber-200
                    ${currentPage("meals") ? "font-bold text-amber-600" : ""}
                `}
                href='meals'>
                    <Utensils />
                    <p>Today’s Meals</p>
                    </Link>
            <Link 
                className={`p-3 flex-1 text-center flex flex-col items-center 
                    hover:bg-amber-200
                    ${currentPage("saved") ? "font-bold text-amber-600" : ""}
                `}
                href='saved'>
                    <Heart />
                    <p>Saved</p>
            </Link >
            <Link 
                className={`p-3 flex-1 text-center flex flex-col items-center 
                    hover:bg-amber-200
                    ${currentPage("search") ? "font-bold text-amber-600" : ""}
                `}
                href='search'>
                     <AudioWaveform />
                    <p>AI Search</p>
            </Link >
            <Link 
                className={`p-3 flex-1 text-center flex flex-col items-center 
                    hover:bg-amber-200
                    ${currentPage("stats") ? "font-bold text-amber-600" : ""}
                `}
                href='stats'>
                    <ChartColumnBig />
                    <p>Stats</p>
            </Link >
        </section>
    )
}