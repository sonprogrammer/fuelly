import { LoaderCircle } from 'lucide-react'


export function KakaoLoginFallback() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <LoaderCircle className="w-6 h-6 text-emerald-400 animate-spin" />
        </div>
        <p className="text-xs font-medium tracking-widest text-emerald-500 uppercase mb-3">
          Fuelly
        </p>
        <h1 className="text-xl font-semibold text-white mb-2">
          로그인하고 있어요
        </h1>
        <p className="text-sm text-gray-500">
          잠시만 기다려주세요
        </p>
      </div>
    </div>
  )
}