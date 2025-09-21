import { useParams } from 'next/navigation'
import { FiShare2 } from 'react-icons/fi'

const Toolbar = () => {
  const params = useParams()

  const handleShare = async () => {
    if (!params.roomId) return
    const shareUrl = `${window.location.origin}/?roomId=${params.roomId as string}`
    await navigator.clipboard.writeText(shareUrl)
  }

  return (
    <div className="absolute left-4 top-4 z-20">
      <button
        onClick={handleShare}
        className="rounded-full border border-slate-600/30 bg-slate-800/30 p-2 text-slate-400 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-slate-800/50 hover:text-slate-300 active:scale-95"
      >
        <FiShare2 />
      </button>
    </div>
  )
}

export default Toolbar
