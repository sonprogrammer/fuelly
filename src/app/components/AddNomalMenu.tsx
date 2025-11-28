'use client'
// TODO여기서 플러스 버튼 클릭하면 오늘 먹은 음식으로 이동 상태로 만들고 디비로 보내버리기 나중에 공유도 해야하니깐
import { Search, Plus, Sparkles } from 'lucide-react'
import { useState } from 'react';
import MenuItem from './MenuItem'

export default function AddNomalMenu(){
    const [searchQuery, setSearchQuery] = useState('');
    const COMMON_FOODS = [
        { name: '계란', calories: 78, protein: 6.3, unit: '1개' },
        { name: '소고기', calories: 250, protein: 26, unit: '100g' },
        { name: '돼지고기', calories: 242, protein: 27, unit: '100g' },
        { name: '닭가슴살', calories: 165, protein: 31, unit: '100g' },
        { name: '연어', calories: 206, protein: 22, unit: '100g' },
        { name: '참치 통조림', calories: 132, protein: 28, unit: '100g' },
        { name: '두부', calories: 76, protein: 8, unit: '100g' },
        { name: '우유', calories: 61, protein: 3.2, unit: '200ml' },
        { name: '그릭 요거트', calories: 97, protein: 10, unit: '100g' },
        { name: '현미밥', calories: 149, protein: 3, unit: '1공기' },
        { name: '고구마', calories: 86, protein: 1.6, unit: '100g' },
        { name: '바나나', calories: 89, protein: 1.1, unit: '1개' },
        { name: '아몬드', calories: 579, protein: 21, unit: '100g' },
        { name: '프로틴 쉐이크', calories: 120, protein: 24, unit: '1스쿱' },
      ];

      const filteredFoods = COMMON_FOODS.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    return(
        <div className="bg-white rounded-md mt-3 border border-gray-300 p-5">
            <h1 className="font-bold">일반 음식 검색</h1>
            <h2 className='text-gray-500'>자주 먹는 음식을 빠르게 추가하세요</h2>
            <section className='relative mt-3'>
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                <input type="text" 
                    placeholder="음식 검색..."
                    className="pl-10 bg-gray-100 w-full rounded-lg p-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto mt-5">
            {filteredFoods.map((food) => (
                <MenuItem food={food} type="add" key={food.name}/>
            ))}
          </div>
        </div>
    )
}