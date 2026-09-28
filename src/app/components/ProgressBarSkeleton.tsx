export function ProgressBarSkeleton() {
  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5 animate-pulse">
            <div className="flex items-center justify-between mb-5">
                <div className="w-20 h-4 bg-gray-800 rounded" />
                <div className="w-8 h-8 bg-gray-800 rounded-lg" />
            </div>

            <div className="w-24 h-7 bg-gray-800 rounded mb-3" />
            <div className="w-full h-2 bg-gray-800 rounded-full mb-3" />
            <div className="w-32 h-3 bg-gray-800 rounded" />
        </div>
  )
}