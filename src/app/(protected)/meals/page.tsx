import TodayMenuComponent from '../../components/TodayMenuComponent'
import AddMenu from '../../components/AddMenu'

export default function MealsPage() {

    return (
        <div className='flex flex-col sm:flex-row gap-5 p-5'>
            <section className='flex-1'>
                <TodayMenuComponent />
            </section>

            <section className='flex-1'>
                <AddMenu />
            </section>
        </div>
    )
}