"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";

interface Food {
    id: number;
    food: string;
    amount: string;
    protein: number;
    calorie: number;
}

export default function FoodTable() {
    const [foods, setFoods] = useState<Food[]>([
        { id: 1, food: "계란", amount: "1개", protein: 6, calorie: 78 },
        { id: 2, food: "고구마", amount: "100g", protein: 2, calorie: 86 },
        { id: 3, food: "닭가슴살", amount: "100g", protein: 23, calorie: 165 },
    ]);

    // TODO 저장목록에서 삭제
    const deleteFood = (id: number) => {
        setFoods((prev) => prev.filter((f) => f.id !== id));
    };

    // TODO오늘의 식단에 추가
    const addFood = () => {
        setFoods((prev) => [
            ...prev,
            {
                id: Date.now(),
                food: "새 음식",
                amount: "100g",
                protein: 0,
                calorie: 0,
            },
        ]);
    };

    return (
        <div className="p-5">

            <h1 className="text-2xl font-bold text-center gap-2 py-5">
                나중에 혹은 취팅~~?ㅎㅎ
            </h1>

            {/* 모바일 카드 UI */}
            <div className="grid gap-3 md:hidden">
                <p className='text-gray-400 text-right'>+클릭시 오늘 식단에 추가됩니다</p>
                {foods.map((f) => (
                    <Card key={f.id} className="p-5">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="font-bold text-lg">{f.food}</h2>
                                <p className="text-sm text-gray-600">{f.amount}</p>
                                <p className="text-sm">단백질: {f.protein}g</p>
                                <p className="text-sm">칼로리: {f.calorie}kcal</p>
                            </div>
                            <section className="h-full flex items-center gap-2">
                                <button onClick={() => deleteFood(f.id)}>
                                    <Plus className="text-green-500" />
                                </button>
                                <button onClick={() => deleteFood(f.id)}>
                                    <Trash2 className="text-red-500" />
                                </button>
                            </section>

                        </div>
                    </Card>
                ))}
            </div>

            {/* 데스크탑 테이블 UI */}
            <table className="hidden md:table w-full text-center border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="p-2">음식</th>
                        <th className="p-2">양</th>
                        <th className="p-2">단백질(g)</th>
                        <th className="p-2">칼로리(kcal)</th>
                        <th className="p-2">오늘 식단에 추가</th>
                        <th className="p-2">삭제</th>
                    </tr>
                </thead>

                <tbody>
                    {foods.map((f) => (
                        <tr key={f.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">{f.food}</td>
                            <td className="p-2">{f.amount}</td>
                            <td className="p-2">{f.protein}</td>
                            <td className="p-2">{f.calorie}</td>
                            <td className="p-2">
                                <button onClick={() => deleteFood(f.id)}>
                                    <Plus className="text-green-500" />
                                </button>
                            </td>
                            <td className="p-2">
                                <button onClick={() => deleteFood(f.id)}>
                                    <Trash2 className="text-red-500" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
