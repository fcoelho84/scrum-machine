import { MessageTypes, type Room } from 'party/types'
import { useConfigContext } from '../context'
import { useVotes } from '~/hooks/useVotes'
import { useSocketMessage, useSocketSendMessage } from '~/hooks/useSocket'

const SpectatorMode = () => {
  const sendMessage = useSocketSendMessage()
  const config = useConfigContext()
  const users = useSocketMessage<Room['users']>((state) => state?.users)
  const votes = useVotes(users)

  const handle = () => {
    config.toggleSpectatorMode()
    sendMessage(MessageTypes.userUpdate, {
      state: config.isSpectator ? 'waiting' : 'spectator',
      point: '',
    })
  }

  return (
    <div className="flex h-fit w-full items-center gap-2">
      <label className="mb-1text-primary/85">Modo Espectador:</label>

      <input
        disabled={votes.isIdle}
        checked={config.isSpectator}
        type="checkbox"
        className="toggle"
        onChange={handle}
      />
    </div>
  )
}

export default SpectatorMode
