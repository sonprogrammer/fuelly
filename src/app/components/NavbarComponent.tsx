
import Link from "next/link";
import { Utensils, Star, AudioWaveform, ChartColumnBig } from 'lucide-react';


export default function NavbarComponent() {

    return (
        <section className='flex justify-around h-full'>
            <Link 
                className="hover:bg-amber-200 p-3 flex-1 text-center flex flex-col items-center"
                href='meals'>
                    <Utensils />
                    <p>Today’s Meals</p>
                    </Link>
            <Link 
                className="hover:bg-amber-200 p-3 flex-1 text-center flex flex-col items-center"
                href='saved'>
                    <Star />
                    <p>Saved</p>
            </Link >
            <Link 
                className="hover:bg-amber-200 p-3 flex-1 text-center flex flex-col items-center"
                href='search'>
                     <AudioWaveform />
                    <p>AI Search</p>
            </Link >
            <Link 
                className="hover:bg-amber-200 p-3 flex-1 text-center flex flex-col items-center"
                href='stats'>
                    <ChartColumnBig />
                    <p>Stats</p>
            </Link >
        </section>
    )
}