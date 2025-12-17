import { Plus, Trash2, Star } from 'lucide-react'
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
                        className={`${type === 'add' && 'text-sm'}`}
                    >
                        {food.name}
                    </span>
                    <p
                        className={`${type === 'add' && 'text-sm'}`}
                    >{food.unit}</p>
                    {type === 'add' &&
                        <button
                            onClick={()=>handleSaveToggle?.(food._id!)}
                            className={`p-1 border rounded-md bg-white cursor-pointer
                                
                                `}
                        >
                            <Star 
                                className='w-4 h-4' 
                                fill={isSaved ? "#FFD700" : "none"} 
                                color={isSaved ? "#FFD700" : "currentColor"}
                                />
                        </button>
                    }
                </div>

                <div className={`${type === 'add' ? 'flex flex-col text-sm' : 'flex gap-3 mt-1'}`}>
                    <span className="text-gray-600">{food.calorie} kcal</span>
                    <span className="text-gray-600">단백질 {food.protein}g</span>
                </div>
            </div>

            {type === 'add' ?
                <button
                    onClick={() => add?.(food)}
                    className=' p-2 px-3 h-full cursor-pointer rounded-xl bg-linear-to-br from-purple-400 to-orange-400 text-white'
                >
                    <Plus className="h-4 w-4" />
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