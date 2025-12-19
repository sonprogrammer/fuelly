import { Card, CardContent} from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import dayjs from "dayjs";
import "dayjs/locale/ko"
import { Food } from '@/types/food'

interface DayData {
  date: string;
  totalCalorie: number;
  totalProtein: number;
  meals: Food[];
  fullDate?:string;
}

interface FoodRecordProps {
  sampleData: DayData[];
  PRO_LIMIT: number;
  CAL_LIMIT: number;
}

export default function FoodRecordComponent({ sampleData, PRO_LIMIT, CAL_LIMIT }: FoodRecordProps) {
  dayjs.locale("ko")

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto px-4 sm:px-0 py-4">
      {sampleData.map((day) => {
        const isCalOver = day.totalCalorie > CAL_LIMIT;
        
        return (
          <div key={day.date} className="group">
            {/* //*날짜 */}
            <div className="flex items-center gap-2 mb-3 px-1">
              <span className="text-xl sm:text-2xl font-black text-gray-900">{dayjs(day.fullDate).format("D")}</span>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase">{dayjs(day.fullDate).format("MMM")}</span>
                <span className="text-sm font-semibold text-blue-600">{dayjs(day.fullDate).format("dddd")}</span>
              </div>
            </div>

            <Card className="h-[480px] border border-gray-100 shadow-sm overflow-hidden rounded-2xl flex flex-col ">
              <CardContent className="p-0 flex-1 flex flex-col min-h-0">
                <div className="p-6 sm:p-8 bg-white flex-1 flex flex-col overflow-hidden">
                  
                  <div className="grid grid-cols-2 gap-6 mb-8 shrink-0">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-gray-300 tracking-widest">CALORIES</p>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-xl font-black ${isCalOver ? 'text-orange-500' : 'text-gray-900'}`}>
                          {day.totalCalorie.toLocaleString()}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400">/ {CAL_LIMIT}</span>
                      </div>
                      <Progress value={(day.totalCalorie / CAL_LIMIT) * 100} className="h-1.5 bg-gray-100" />
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-gray-300 tracking-widest">PROTEIN</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black text-gray-900">{day.totalProtein.toLocaleString()}</span>
                        <span className="text-[10px] font-bold text-gray-400">/ {PRO_LIMIT}</span>
                      </div>
                      <Progress value={(day.totalProtein / PRO_LIMIT) * 100} className="h-1.5 bg-gray-100" />
                    </div>
                  </div>

                  {/* //*음식 리스트 */}
                  <div className="flex-1 flex flex-col min-h-0">
                    <p className="text-3 font-black text-gray-300 tracking-widest uppercase mb-3">Meal Log</p>
                    
                    <div className="flex-1 overflow-y-auto pr-2  space-y-2">
                      {day.meals.length > 0 && (
                        day.meals.map((meal, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/70 hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm font-bold text-gray-700 truncate">{meal.name}</span>
                              <span className="text-[11px] text-gray-400 font-medium">{meal.unit}</span>
                            </div>
                            <div className="flex flex-col items-end shrink-0 ml-4">
                              <span className="text-xs font-black text-gray-600">{meal.calorie} <small className="font-normal text-gray-400">kcal</small></span>
                              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">P {meal.protein}g</span>
                            </div>
                          </div>
                        ))
                      ) }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
      </div>

  )
}