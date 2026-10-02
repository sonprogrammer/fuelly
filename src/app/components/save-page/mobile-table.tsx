import { EachVersionProps, SavedFood } from "@/app/components/save-page/types";
import { Calendar, Trash2 } from "lucide-react";

export function MobilVersion({savedFoods, addFood, deleteFood}: EachVersionProps){
    return(
        <div className="flex flex-col gap-2 md:hidden">
                {savedFoods?.map((f: SavedFood) => (
                    <div key={f.foodId._id} className="flex items-center justify-between px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 transition-colors">
                        <div className="flex flex-col gap-1 min-w-0">
                            <span className="text-sm font-semibold text-white truncate">{f.foodId.name}</span>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                <span>{f.foodId.unit}</span>
                                <span className="w-px h-3 bg-gray-700" />
                                <span>{f.foodId.calorie} kcal</span>
                                <span className="w-px h-3 bg-gray-700" />
                                <span>단백질 {f.foodId.protein}g</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 ml-3 shrink-0">
                            <button
                                onClick={() => addFood(f.foodId)}
                                aria-label='식단추가'
                                className="p-2 rounded-lg hover:bg-blue-500/10 transition-colors cursor-pointer"
                            >
                                <Calendar className="w-4 h-4 text-blue-400" />
                            </button>
                            <button
                                onClick={() => deleteFood(f.foodId._id!)}
                                aria-label='저장삭제'
                                className="p-2 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                            >
                                <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
    )
}