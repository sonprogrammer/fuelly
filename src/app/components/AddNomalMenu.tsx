'use client'
// TODO여기서 플러스 버튼 클릭하면 오늘 먹은 음식으로 이동 상태로 만들고 디비로 보내버리기 나중에 공유도 해야하니깐
import { Search } from 'lucide-react'
import { useState } from 'react';
import MenuItem from './MenuItem'
import AddCustomMenuModal from './AddCustomMenuModal'
import useGetNomalFoods from '../../hooks/useGetNomalFoods'
import { Food } from '../../types/food'

export default function AddNomalMenu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  
  const {data} = useGetNomalFoods()


  const filteredFoods = data?.filter((food: Food) =>
    food.name.includes(searchQuery)
  )

  const handleModalOpenClick = () => {
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  return (
    <div className="bg-white rounded-md mt-3 border border-gray-300 p-5">
      <section className='flex justify-between items-center'>
        <div>
          <h1 className="font-bold">일반 음식 검색</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto mt-5">
        {filteredFoods?.map((food: Food) => (
          <MenuItem food={food} type="add" key={food.name} />
        ))}
      </div>

      {modalOpen && (
      <AddCustomMenuModal open={modalOpen} onClose={handleModalClose} />
      )}

    </div>
  )
}