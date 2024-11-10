import { MessageTypes } from 'party/types'
import { useSocket } from '~/hooks/useSocket'
import { useConfigContext } from '../context'
import { useSlotContext } from '~/components/SlotMachine/context'

const SpectatorMode = () => {
  const socket = useSocket()
  const config = useConfigContext()
  const slot = useSlotContext()
  const handle = () => {
    config.toggleSpectatorMode()
    socket.send(MessageTypes.userUpdate, {
      state: config.isSpectator ? 'waiting' : 'spectator',
      point: '4',
      id: socket.id,
    })
  }

  return (
    <div className="flex h-fit w-full items-center gap-2">
      <label className="mb-1text-primary/85">Modo Espectador:</label>

      <input
        disabled={!slot.animationEnd}
        checked={config.isSpectator}
        type="checkbox"
        className="toggle"
        onChange={handle}
      />
    </div>
  )
}

export default SpectatorMode
