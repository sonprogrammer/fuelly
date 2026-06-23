'use client'

import {  Search, Database, Loader2, AlertCircle, RotateCcw, Plus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react';
import MenuItem from './MenuItem'
import AddCustomMenuModal from './AddCustomMenuModal'
import useGetNomalFoods from '@/hooks/useGetNomalFoods'
import usePostFoodToDailyMeal from '@/hooks/usePostFoodToDailyMeal'
import useToggleSaveFood from '@/hooks/useToggleSaveFood'
import useGetSavedFood from '@/hooks/useGetSavedFood'
import usePostAddCustomFood from '@/hooks/usePostAddCustomFood'
import { Food } from '@/types/food'
import { toast } from 'react-hot-toast'
import { useUserStore } from '@/store/userStore';
import { useDeleteMyFoods } from '@/hooks/useDeleteMyFoods';
import { DeleteConfimModal } from '@/app/components/DeleteConfimModal';

interface SavedFood {
  _id: string;
  savedUser: string;
  foodId: Food
}

export default function AddNomalMenu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debounceQuery, setDebounceQuery] = useState(searchQuery)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [tab, setTab] = useState('all')
  const [targetFood, setTargetFood] = useState<Food | null>(null)
  const user = useUserStore(state => state.user)


  const { mutate: deleteFood, isPending: deleting } = useDeleteMyFoods()
  const { data, isPending, isError, refetch } = useGetNomalFoods()
  const { mutate: saveNomalFood, isPending: addNomalFoodPending } = usePostAddCustomFood()
  const { mutate: saveDailyFoods, isPending: dailyPending } = usePostFoodToDailyMeal()
  const { mutate: toggleSave } = useToggleSaveFood()
  const { data: savedFoods } = useGetSavedFood()

  useEffect(() => {
    const debounceHandleer = setTimeout(() => {
      setDebounceQuery(searchQuery)
    }, 500)
    return () => clearTimeout(debounceHandleer)
  }, [searchQuery])

  //* 탭과 검색어 따른 필터
  const filteredFoods = useMemo(() => {
    return data?.filter((food: Food) => {
      const matchesSearch = food.name.includes(debounceQuery.toLowerCase())
      const matchestab = tab === 'all' ? true : food.createdBy !== 'system'
      return matchesSearch && matchestab
    })
  }, [data, debounceQuery, tab])

  //* 유저가 만든 음식의 갯수
  const myFoodsCount = data?.filter((food: Food) =>
    food.createdBy !== 'system' && food.createdBy === user?._id
  ).length || 0

  // * 저장된 모든 음식의 종류 (기본 퐇마)
  const allFoodsCount = data?.length ?? 0


  const isMine = (createdBy?: string) => {
    return createdBy !== 'system' && createdBy === user?._id
  }

  const savedFoodIdSet = new Set(
    savedFoods?.map((item: SavedFood) => item.foodId._id)
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
    <>
        <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Database className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-white">음식 검색</h2>
                    <p className="text-xs text-gray-600">자주 먹는 음식을 빠르게 추가하세요</p>
                </div>
            </div>
            <button
                onClick={handleModalOpenClick}
                className="flex items-center gap-1.5 px-3 py-2 bg-gray-700 text-gray-200 text-xs font-medium rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
            >
                <Plus className="w-3.5 h-3.5" />
                직접 입력
            </button>
        </div>

        <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
                type="text"
                placeholder="음식 이름으로 검색..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-800 border border-gray-700 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

        <div className="flex gap-1 mb-4 bg-gray-800 p-1 rounded-lg">
            <button
                onClick={() => setTab('all')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-all
                    ${tab === 'all' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-400'}`}
            >
                전체
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${tab === 'all' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-700 text-gray-500'}`}>
                    {allFoodsCount}
                </span>
            </button>
            <button
                onClick={() => setTab('mine')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-all
                    ${tab === 'mine' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-400'}`}
            >
                내가 추가한 목록
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${tab === 'mine' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-700 text-gray-500'}`}>
                    {myFoodsCount}
                </span>
            </button>
        </div>

        {isPending && (
            <div className='w-full flex justify-center py-10'>
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            </div>
        )}

        {isError && (
            <div className="flex flex-col items-center justify-center py-10 px-5 text-center border border-dashed border-red-500/30 rounded-xl bg-red-500/5">
                <AlertCircle className="w-10 h-10 text-red-400 mb-3" />
                <p className="text-sm font-medium text-red-400">데이터를 불러오지 못했습니다</p>
                <p className="text-xs text-red-500/70 mt-1 mb-4">네트워크 상태를 확인하거나 다시 시도해주세요.</p>
                <button
                    onClick={() => refetch()}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-400 transition-colors"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                    다시 시도
                </button>
            </div>
        )}

        {!isPending && !isError && (
            <div className="border border-gray-800 rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-800 max-h-96 overflow-y-auto">
                    {filteredFoods?.length === 0 ? (
                        <div className="col-span-2 flex flex-col items-center justify-center py-10 text-center">
                            <Search className="w-8 h-8 text-gray-700 mb-2" />
                            <p className="text-sm text-gray-600">검색 결과가 없습니다</p>
                        </div>
                    ) : (
                        filteredFoods?.map((food: Food) => (
                            <MenuItem
                                food={food}
                                type="add"
                                key={food._id}
                                add={handleAddbtnClick}
                                handleSaveToggle={handleSaveToggle}
                                isSaved={savedFoodIdSet.has(food._id!)}
                                isMine={isMine(food.createdBy ?? '')}
                                foodDelete={() => setTargetFood(food)}
                            />
                        ))
                    )}
                </div>
            </div>
        )}

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

        {targetFood && (
            <DeleteConfimModal
                food={targetFood}
                open={!!targetFood}
                onClose={() => setTargetFood(null)}
                deleting={deleting}
                onConfirm={(food) => {
                    deleteFood(food)
                    setTargetFood(null)
                }}
            />
        )}
    </>
  
  )
}