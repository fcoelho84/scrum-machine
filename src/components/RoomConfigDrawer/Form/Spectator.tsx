import { MessageTypes, type Room } from 'party/types'
import { useSocket } from '~/hooks/useSocket'
import { useConfigContext } from '../context'
import { useVotes } from '~/hooks/useVotes'

const SpectatorMode = (props: Room) => {
  const socket = useSocket()
  const config = useConfigContext()
  const votes = useVotes(props.users)
  const handle = () => {
    config.toggleSpectatorMode()
    socket.send(MessageTypes.userUpdate, {
      state: config.isSpectator ? 'waiting' : 'spectator',
      point: '',
      id: socket.id,
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
