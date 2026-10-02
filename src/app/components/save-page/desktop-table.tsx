import { EachVersionProps, SavedFood } from "@/app/components/save-page/types";
import { Calendar, Trash2 } from "lucide-react";



export function DesktopVersion({savedFoods, addFood, deleteFood}: EachVersionProps){
    return(
        <div className="hidden md:block border border-gray-800 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-800 border-b border-gray-700">
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">음식</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">제공량</th>
                            <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">칼로리</th>
                            <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">단백질</th>
                            <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 w-16">식단추가</th>
                            <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 w-16">삭제</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {savedFoods?.map((f: SavedFood) => (
                            <tr key={f.foodId._id} className="hover:bg-gray-800/50 transition-colors">
                                <td className="px-4 py-3 font-medium text-white">{f.foodId.name}</td>
                                <td className="px-4 py-3 text-gray-600 text-xs">{f.foodId.unit}</td>
                                <td className="px-4 py-3 text-center text-orange-400 font-medium">{f.foodId.calorie} kcal</td>
                                <td className="px-4 py-3 text-center text-emerald-400 font-medium">{f.foodId.protein}g</td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        onClick={() => addFood(f.foodId)}
                                        aria-label='식단추가'
                                        className="p-2 rounded-lg hover:bg-blue-500/10 transition-colors cursor-pointer inline-flex"
                                    >
                                        <Calendar className="w-4 h-4 text-blue-400" />
                                    </button>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        onClick={() => deleteFood(f.foodId._id!)}
                                        aria-label='저장삭제'
                                        className="p-2 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer inline-flex"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-400" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    )
}