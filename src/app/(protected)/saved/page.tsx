import { SavedTable } from "@/app/components/save-page";


export default function FoodTable() {
    
    return (
        <div className="p-5 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-white">즐겨찾기한 음식</h2>
                <p className="text-xs text-gray-600">달력 아이콘으로 오늘 식단에 추가</p>
            </div>

            <SavedTable />
        </div>
    );
}
