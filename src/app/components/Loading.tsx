// app/components/Loading.tsx
import { Sparkles } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
      <div className="relative flex flex-col items-center">

        <div className="relative mb-4">
          <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
          <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-500 w-6 h-6 animate-pulse" />
        </div>
        

        <h2 className="text-xl font-black text-emerald-600 tracking-tighter animate-pulse">
          FUELLY
        </h2>
        <p className="mt-2 text-sm font-medium text-gray-400">
          사용자 정보를 불러오고 있습니다...
        </p>
      </div>


      <div className="absolute bottom-10 text-gray-300 text-xs font-bold tracking-widest uppercase">
        Healthy Life with AI
      </div>
    </div>
  );
}