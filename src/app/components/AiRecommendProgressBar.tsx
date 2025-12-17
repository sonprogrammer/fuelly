

export default function AiRecommendProgressBar({ percent }: { percent: number }) {

    return(
        <div className="w-full h-2.5 bg-gray-200 rounded">
      <div
        className="h-full bg-linear-to-tr from-green-500 to-blue-500 rounded transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
    )
}