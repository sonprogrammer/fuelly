'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Utensils, Heart, AudioWaveform, ChartColumnBig } from 'lucide-react'
import { useUserStore } from '@/store/userStore'

const navItems = [
    { path: 'meals', icon: Utensils, label: 'Today' },
    { path: 'saved', icon: Heart, label: 'Saved' },
    { path: 'search', icon: AudioWaveform, label: 'AI Search' },
    { path: 'stats', icon: ChartColumnBig, label: 'Stats' },
]

export default function NavbarComponent() {
    const user = useUserStore(state => state.user)
    const pathname = usePathname()

    // const isSurveyPage = pathname === '/survey'

    // if(!user || isSurveyPage){
    //     return null
    // }

    if (!user || pathname === '/survey') return null

    // const currentPage = (path: string) => pathname === `/${path}`

    return (
        <nav className="flex-none w-full bg-gray-900 border-t border-gray-800 z-50">

            <section className='flex justify-around'>
                {navItems.map(({ path, icon: Icon, label }) => {
                    const isActive = pathname === `/${path}`
                    return (
                        <Link
                            key={path}
                            href={path}
                            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors
                            ${isActive
                                    ? 'text-emerald-500 font-black'
                                    : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
                            <span>{label}</span>
                        </Link>
                    )
                })}
            </section>
        </nav>
    )
}