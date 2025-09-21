import { useParams } from 'next/navigation'
import { FiShare2, FiEye, FiEyeOff } from 'react-icons/fi'
import { MessageTypes } from 'party/types'
import { useSocketSendMessage, useSocketCurrentUser } from '~/hooks/useSocket'

const Toolbar = () => {
  const params = useParams()
  const sendMessage = useSocketSendMessage()
  const currentUser = useSocketCurrentUser()

  const handleShare = async () => {
    if (!params.roomId) return
    const shareUrl = `${window.location.origin}/?roomId=${params.roomId as string}`
    await navigator.clipboard.writeText(shareUrl)
  }

  const handleToggleSpectator = () => {
    if (!currentUser) return

    const newState = currentUser.state === 'spectator' ? 'waiting' : 'spectator'

    sendMessage(MessageTypes.userUpdate, {
      state: newState,
      point: '',
      id: currentUser.id,
    })
  }

  const isSpectator = currentUser?.state === 'spectator'

  return (
    <div className="absolute left-4 top-4 z-20 flex gap-2">
      <button
        onClick={handleShare}
        className="rounded-full border border-slate-600/30 bg-slate-800/30 p-2 text-slate-400 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-slate-800/50 hover:text-slate-300 active:scale-95"
      >
        <FiShare2 />
      </button>
      <div
        className="tooltip tooltip-right w-full md:w-auto"
        data-tip={
          isSpectator ? 'Sair do modo espectador' : 'Entrar no modo espectador'
        }
      >
        <button
          data-spectator={isSpectator}
          onClick={handleToggleSpectator}
          className="data-[spectator=false]:hover:text-slate-300' rounded-full border border-slate-600/30 bg-slate-800/30 p-2 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-slate-800/50 active:scale-95 data-[spectator=true]:border-primary/50 data-[spectator=false]:text-slate-400 data-[spectator=true]:text-primary"
        >
          <FiEye data-hidden={isSpectator} />
          <FiEyeOff data-hidden={!isSpectator} />
        </button>
      </div>
    </div>
  )
}

export default Toolbar
