'use client'
import dayjs from "dayjs";
import "dayjs/locale/ko"
import { Food } from '@/types/food'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface DayData {
  date: string;
  totalCalorie: number;
  totalProtein: number;
  meals: Food[];
  fullDate?: string;
}

interface FoodRecordProps {
  sampleData: DayData[];
  PRO_LIMIT: number;
  CAL_LIMIT: number;
}

dayjs.locale("ko")
export default function FoodRecordComponent({ sampleData, PRO_LIMIT, CAL_LIMIT }: FoodRecordProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleOpen = (id: string) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 space-y-3">
      {sampleData.map((day) => {
        const isOpen = openIds.includes(day.date);

        return (
          <div key={day.date} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            {/* 요약 헤더 (언제나 노출) */}
            <div
              className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-800/50 transition-colors"
              onClick={() => toggleOpen(day.date)}
            >
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-gray-500 uppercase">{dayjs(day.fullDate).format("MMM")}</p>
                  <p className="text-xl font-black text-white">{dayjs(day.fullDate).format("D")}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{dayjs(day.fullDate).format("dddd")}</p>
                  <div className="flex gap-3 text-[11px] text-gray-400 font-medium">
                    <span>{day.meals.length}개 음식</span>
                  </div>
                </div>
                <div className="flex flex-col text-gray-400 text-[11px] font-medium justify-center">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold">
                      <span className={day.totalCalorie > CAL_LIMIT ? "text-red-500" : "text-gray-500"}>
                        {day.totalCalorie.toLocaleString()}
                      </span>
                      <span className="text-gray-600 mx-1">/</span>
                      <span className="text-gray-400">{CAL_LIMIT} kcal</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold">
                      <span className={day.totalProtein >= PRO_LIMIT ? "text-emerald-400" : "text-gray-500"}>
                        {day.totalProtein.toLocaleString()}
                      </span>
                      <span className="text-gray-600 mx-1">/</span>
                      <span className="text-gray-400">{PRO_LIMIT} g</span>
                    </span>
                  </div>
                </div>
              </div>


              <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${openIds ? '' : 'rotate-180'}`} />
              </motion.div>
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-gray-950 border-t border-gray-800"
                >
                  <div className="p-4 space-y-2">
                    {day.meals.map((meal, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-gray-900 rounded-xl">
                        <span className="text-sm text-gray-300">{meal.name}</span>
                        <div className="text-right">
                          <p className="text-xs font-bold text-white">{meal.calorie}kcal</p>
                          <p className="text-[10px] text-blue-400">P {meal.protein}g</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  )
}