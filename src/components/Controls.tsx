import { MessageTypes, type Room } from 'party/types'
import { useSocket } from '~/hooks/useSocket'
import { useSlotContext } from './SlotMachine/context'
import { useVotes } from '~/hooks/useVotes'

const Controls = ({ slot, ...props }: Room) => {
  const socket = useSocket()
  const context = useSlotContext()
  const votes = useVotes(props.users)

  const spin = () => {
    context.setAnimationEnd(false)
    socket.send(MessageTypes.slotUpdate, {
      shouldSpin: true,
    })
  }

  const reset = () => {
    socket.send(MessageTypes.userUpdateBulk, {
      state: 'waiting',
    })
  }

  return (
    <div className="r z-10 flex w-full flex-wrap items-center justify-center gap-2">
      <button
        data-hidden={!votes.isIdle}
        className="btn btn-accent"
        disabled={slot.shouldSpin || !votes.isIdle}
        onClick={reset}
      >
        Reiniciar
      </button>
      <button
        data-hidden={votes.isIdle}
        className="btn btn-accent"
        onClick={spin}
        disabled={slot.shouldSpin || votes.isIdle || !votes.isVoted}
      >
        Girar
      </button>
    </div>
  )
}

export default Controls
