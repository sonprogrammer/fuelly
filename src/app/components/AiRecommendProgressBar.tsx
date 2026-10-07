interface AiRecommendProgressBarProps {
  percent: number
  type: 'calorie' | 'protein'
}

export default function AiRecommendProgressBar({percent,type}: AiRecommendProgressBarProps) {
  const safePercent = Math.min(Math.max(percent, 0), 100)

  const barStyle = {
    calorie: 'bg-linear-to-r from-amber-400 to-orange-500',
    protein: 'bg-linear-to-r from-violet-400 to-purple-500'
  }

  return (
    <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ease-out ${barStyle[type]}`}
        style={{ width: `${safePercent}%` }}
      />
    </div>
  )
}