import { MessageTypes, type Room } from 'party/types'
import { useSocketMessage, useSocketSendMessage } from '~/hooks/useSocket'
import { useSlotContext } from '~/components/SlotMachine'
import { useVotes } from '~/hooks/useVotes'

const Controls = () => {
  const sendMessage = useSocketSendMessage()
  const slot = useSocketMessage<Room['slot']>((state) => state?.slot)
  const users = useSocketMessage<Room['users']>((state) => state?.users)
  const context = useSlotContext()
  const votes = useVotes(users ?? [])

  const spin = () => {
    context.setAnimationEnd(false)
    sendMessage(MessageTypes.slotUpdate, {
      shouldSpin: true,
    })
  }

  const reset = () => {
    sendMessage(MessageTypes.userUpdateBulk, {
      state: 'waiting',
    })
  }

  return (
    <div className="r z-10 flex w-full flex-wrap items-center justify-center gap-2">
      <button
        data-hidden={!votes.isIdle}
        className="btn btn-accent"
        disabled={slot?.shouldSpin ?? !votes.isIdle}
        onClick={reset}
      >
        Reiniciar
      </button>
      <button
        data-hidden={votes.isIdle}
        className="btn btn-accent"
        onClick={spin}
        disabled={slot?.shouldSpin ?? (votes.isIdle || !votes.isVoted)}
      >
        Girar
      </button>
    </div>
  )
}

export default Controls
