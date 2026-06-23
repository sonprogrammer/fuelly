import TodayMenuComponent from '../../components/TodayMenuComponent'
import AddMenu from '../../components/AddMenu'

export default function MealsPage() {

    return (
        <div className='flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto mb-10 sm:mb-0'>
        <section className='lg:w-2/5'>
            <TodayMenuComponent />
        </section>
        <section className='lg:w-3/5'>
            <AddMenu />
        </section>
    </div>
    )
}