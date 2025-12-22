'use client'

import { Search,Database } from 'lucide-react'
import { useState } from 'react';
import MenuItem from './MenuItem'
import AddCustomMenuModal from './AddCustomMenuModal'
import useGetNomalFoods from '@/hooks/useGetNomalFoods'
import usePostFoodToDailyMeal from '@/hooks/usePostFoodToDailyMeal'
import useToggleSaveFood from '@/hooks/useToggleSaveFood'
import useGetSavedFood from '@/hooks/useGetSavedFood'
import usePostAddCustomFood from '@/hooks/usePostAddCustomFood'
import { Food } from '@/types/food'
import { toast } from 'react-hot-toast'

export default function AddNomalMenu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const { data, isPending, isError } = useGetNomalFoods()
  const {mutate: saveNomalFood, isPending: addNomalFoodPending} = usePostAddCustomFood()
  const { mutate: saveDailyFoods, isPending: dailyPending } = usePostFoodToDailyMeal()
  const { mutate: toggleSave } = useToggleSaveFood()
  const { data: savedFoods } = useGetSavedFood()

  const filteredFoods = data?.filter((food: Food) =>
    food.name.includes(searchQuery)
  )


  const savedFoodIdSet = new Set(
    savedFoods?.map((item: any) => item.foodId._id)
  )


  const handleModalOpenClick = () => {
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }


  const handleAddbtnClick = (food: Food) => {
    saveDailyFoods(food)
  }

  // !이름은 세이브지만 토글 기증임 좋아요 취소 등록 둘다 가능
  const handleSaveToggle = (foodId: string) => {
    const isCurrentlySaved = savedFoodIdSet.has(foodId)
    toggleSave(foodId, {
      onSuccess: () => {
          if (isCurrentlySaved) {
              toast('즐겨찾기에서 삭제되었습니다.');
          } else {
              toast.success('즐겨찾기에 저장되었습니다!');
          }
      }
  })
  }

  const handleSaveNomal = (food: Food) => {
    saveNomalFood(food, {
      onSuccess: () => {
        handleModalClose()
        toast.success(`${food.name}이(가) 일반 음식에 추가되었습니다!`)
      }, 
    });
  };
  
  const handleSaveDaily = (food: Food) => {
    saveDailyFoods(food, {
      onSuccess: () => {
        handleModalClose()
        toast.success(`${food.name}이(가) 식단에 추가되었습니다!`)
      },
    });
  };


  return (
    <div className="bg-white rounded-md mt-3 border border-gray-300 p-5">
      <section className='flex justify-between items-center'>
        <div>
          <div className='flex gap-2'>
            <h1 className="font-bold">일반 음식 검색</h1>
            <Database className='text-green-500'/>
          </div>
          <p className='text-gray-500 text-sm'>자주 먹는 음식을 빠르게 추가하세요</p>
        </div>

        <div>
          <button
            className="font-bold border p-2 rounded-2xl bg-linear-to-br from-green-50 to-blue-100
            hover:cursor-pointer
            "
            onClick={handleModalOpenClick}
          >직접입력하기</button>

        </div>
      </section>
      <section className='relative mt-3'>
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input type="text"
          placeholder="음식 검색..."
          className="pl-10 bg-gray-100 w-full rounded-lg p-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      {isPending &&
        <div className='w-full flex justify-center mt-10'>
          <img src='/spinner.gif' alt='spinner' className='w-10' />
        </div>
      }
      {isError &&
        <div>
          <h1>데이터 받아오는 중 에러가 발생하였습니다.</h1>
        </div>
      }
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto mt-5">
        {filteredFoods?.map((food: Food) => (
          <MenuItem 
          food={food}
           type="add"
            key={food.name}
             add={handleAddbtnClick} 
             handleSaveToggle={handleSaveToggle} 
             isSaved={savedFoodIdSet.has(food._id!)}
             />
        ))}
      </div>

      {modalOpen && (
        <AddCustomMenuModal 
          open={modalOpen} 
          onClose={handleModalClose} 
          handleSaveDaily={handleSaveDaily} 
          handleSaveNomal={handleSaveNomal}
          dailyPending={dailyPending}
          addNomalFoodPending={addNomalFoodPending}
          />
      )}

    </div>
  )
}