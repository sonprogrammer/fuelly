import { Trash2, Calendar ,Heart } from 'lucide-react'
import { Food } from '../../types/food'


interface MenuItemProps {
    food: Food
    type: 'add' | 'delete'
    add?: (food: Food) => void
    onDelete?: (food: Food) => void
    handleSaveToggle?: (foodId: string) => void
    isSaved?: boolean
}

export default function MenuItem({ food, type, add, onDelete,isSaved, handleSaveToggle }: MenuItemProps) {

    return (
        <div
            key={food.name}
            className="flex relative items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
        >


            <div
                className={`${type === 'add' && 'flex flex-col'}`}
            >

                <div className="flex items-center gap-2">
                    <span
                        className={`${type === 'add' && 'text-md font-bold'}`}
                    >
                        {food.name}
                    </span>
                   
                    {type === 'add' &&
                        <button
                            onClick={()=>handleSaveToggle?.(food._id!)}
                            className={`p-1 border rounded-md bg-white cursor-pointer
                                
                                `}
                        >
                            <Heart
                            className='w-4 h-4'
                             fill={isSaved ? "#EC4899" : "none"} 
                                    color={isSaved ? "#EC4899" : "currentColor"}/>
                            
                        </button>
                    }
                </div>

                <div className={`${type === 'add' ? 'flex flex-col text-sm' : 'flex gap-3 mt-1'}`}>
                    <span className='text-gray-600'>{food.unit}</span>
                    <span className="text-gray-600">{food.calorie} kcal</span>
                    <span className="text-gray-600">단백질 {food.protein}g</span>
                </div>
            </div>

            {type === 'add' ?
                <button
                    onClick={() => add?.(food)}
                    className='border w-[28%] flex flex-col items-center p-2 hover:bg-blue-50 rounded-lg transition-colors'
                >
                    <Calendar className="h-7 w-7 text-blue-500" />
                    <span className="text-[10px] mt-1">식단</span>
                </button>
                :
                <button
                    onClick={() => onDelete?.(food)}
                    className=' p-2 px-3 cursor-pointer rounded-xl text-white hover:bg-gray-200'
                >
                    <Trash2 className="text-red-500 bg-" />
                </button>
            }
        </div>
    )
}