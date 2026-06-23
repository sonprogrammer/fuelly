import { Trash2, Calendar, Heart } from 'lucide-react'
import { Food } from '../../types/food'


interface MenuItemProps {
    food: Food
    type: 'add' | 'delete'
    add?: (food: Food) => void
    onDelete?: (food: Food) => void
    handleSaveToggle?: (foodId: string) => void
    isSaved?: boolean
    isMine?: boolean
    foodDelete?: () => void
}

export default function MenuItem({ food, type, add, onDelete, isSaved, handleSaveToggle, isMine, foodDelete }: MenuItemProps) {

    return (
        <div className="group flex items-center justify-between px-4 py-3 hover:bg-gray-800/50 transition-colors">
        <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2">
                <span className={`truncate ${type === 'add' ? 'text-sm font-semibold text-white' : 'text-sm text-gray-300'}`}>
                    {food.name}
                </span>
                {type === 'add' && (
                    <button
                        aria-label='좋아요 저장'
                        onClick={() => handleSaveToggle?.(food._id!)}
                        className="p-1 rounded-md hover:bg-pink-500/10 transition-colors cursor-pointer"
                    >
                        <Heart
                            className='w-3.5 h-3.5'
                            fill={isSaved ? "#EC4899" : "none"}
                            color={isSaved ? "#EC4899" : "#4B5563"}
                        />
                    </button>
                )}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>{food.unit}</span>
                <span className="w-px h-3 bg-gray-700" />
                <span>{food.calorie} kcal</span>
                <span className="w-px h-3 bg-gray-700" />
                <span>단백질 {food.protein}g</span>
            </div>
        </div>

        <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 ml-3 shrink-0">
            {type === 'add' ? (
                <>
                    <button
                        aria-label='식단추가'
                        onClick={() => add?.(food)}
                        className='p-2 cursor-pointer rounded-lg hover:bg-blue-500/10 transition-colors'
                    >
                        <Calendar className="h-5 w-5 text-blue-400" />
                    </button>
                    {isMine && (
                        <button
                            aria-label='음식 삭제'
                            onClick={() => foodDelete?.()}
                            className='p-2 cursor-pointer rounded-lg hover:bg-red-500/10 transition-colors'
                        >
                            <Trash2 className='h-5 w-5 text-red-400' />
                        </button>
                    )}
                </>
            ) : (
                <button
                    aria-label='식단 삭제'
                    onClick={() => onDelete?.(food)}
                    className='p-2 cursor-pointer rounded-lg hover:bg-red-500/10 transition-colors'
                >
                    <Trash2 className="text-red-400 h-5 w-5" />
                </button>
            )}
        </div>
    </div>
   
    )
}