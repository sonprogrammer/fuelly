
import Link from "next/link";

export default function NavbarComponent() {

    return (
        <section className='flex justify-around h-full'>
            <Link 
                className="hover:bg-amber-200 p-5 flex-1 text-center"
                href='meals'>Today’s Meals</Link>
            <Link 
                className="hover:bg-amber-200 p-5 flex-1 text-center"
                href='saved'>Saved</Link >
            <Link 
                className="hover:bg-amber-200 p-5 flex-1 text-center"
                href='search'>AI Search</Link >
            <Link 
                className="hover:bg-amber-200 p-5 flex-1 text-center"
                href='stats'>Stats</Link >
        </section>
    )
}