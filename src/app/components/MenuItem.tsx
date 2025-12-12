import { Plus, Trash2 } from 'lucide-react'
import { Food } from '../../types/food'


interface MenuItemProps {
    food: Food
    type: 'add' | 'delete',
}

export default function MenuItem({ food, type }: MenuItemProps) {
    return (
        <div
            key={food.name}
            className="flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
            <div>
                <div className="flex items-center gap-2">
                    <span>{food.name}</span>
                    <p >{food.unit}</p>
                </div>
                <div className="flex gap-3 mt-1">
                    <span className="text-gray-600">{food.calories} kcal</span>
                    <span className="text-gray-600">단백질 {food.protein}g</span>
                </div>
            </div>
            {type === 'add' ?
                <button
                    //   size="sm"
                    //   onClick={() => handleAddCommonFood(food)}
                    className=' p-2 px-3 cursor-pointer rounded-xl bg-black text-white'
                >
                    <Plus className="h-4 w-4" />
                </button>
                :
                <button
                    //   size="sm"
                    //   onClick={() => handleAddCommonFood(food)}
                    className=' p-2 px-3 cursor-pointer rounded-xl text-white hover:bg-gray-200'
                >
                    <Trash2 className="text-red-500 bg-" />
                </button>
            }
        </div>
    )
}