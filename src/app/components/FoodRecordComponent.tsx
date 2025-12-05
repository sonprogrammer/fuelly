import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";


// const sampleData: MealData[] = [
//     { date: "2025-12-01", calories: 1800, proteins: 100, meals: ["계란 2개", "닭가슴살 100g"] },
//     { date: "2025-12-02", calories: 2200, proteins: 120, meals: ["고구마 150g", "연어 80g"] },
//     { date: "2025-12-03", calories: 2000, proteins: 150, meals: ["바나나 1개", "두부 100g"] },
//   ];
interface DayData {
    date: string;
    calories: number;
    proteins: number;
    meals: string[];
  }
  
  interface FoodRecordProps {
    sampleData: DayData[];
    PRO_LIMIT: number;
    CAL_LIMIT: number;
  }

export default function FoodRecordComponent({sampleData, PRO_LIMIT, CAL_LIMIT}: FoodRecordProps) {

   
    return(
        <div>
            <div className="p-5 flex flex-col gap-5">
      {sampleData.map((day) => (
        <Card key={day.date} className="w-full max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>{day.date}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span>칼로리</span>
                <span>{day.calories} / {CAL_LIMIT} Kcal</span>
              </div>
              <Progress value={(day.calories / CAL_LIMIT) * 100} />
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span>단백질</span>
                <span>{day.proteins} / {PRO_LIMIT} g</span>
              </div>
              <Progress value={(day.proteins / PRO_LIMIT) * 100} />
            </div>

            <div>
              <h4 className="font-medium mb-1">식단</h4>
              <ul className="list-disc list-inside text-sm">
                {day.meals.map((meal, idx) => (
                  <li key={idx}>{meal}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
        </div>
    )
}