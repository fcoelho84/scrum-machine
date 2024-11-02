import { type RoomUser, type Room } from 'party/types'
import { useAudio } from '~/hooks/useAudio'
import { useSocket } from '~/hooks/useSocket'
import { useSlotContext } from './context'

const Slot = (props: Room) => {
  const socket = useSocket()
  const sound = useAudio('/spin.mp3')
  const context = useSlotContext()

  const onAnimationStart = () => {
    if (props.slot.shouldSpin) {
      sound.play()
      return
    }

    sound.pause()
    sound.currentTime = 0
  }

  const onLastChildAnimationEnd = () => {
    context.setAnimationEnd(true)
    socket.send({
      type: 'slot-machine-state',
      data: {
        shouldSpin: false,
      },
    })
  }

  const onAnimationEnd = () => {
    socket.send({
      type: 'user-update-bulk',
      data: {
        state: 'idle',
      },
    })
    onLastChildAnimationEnd()
  }

  const getValues = (user: RoomUser) => {
    const vote = user.point || '👀'

    if (user?.state === 'voted' && !props.slot.shouldSpin) {
      return ['✔️']
    }

    if (user?.state === 'idle' && !props.slot.shouldSpin) {
      return [vote]
    }

    if (user?.state === 'waiting') {
      return ['🤔']
    }

    if (props.slot.shouldSpin) {
      return [...props.slot.values, vote]
    }

    return props.slot.values
  }

  return (props.users ?? []).map((user, index) => {
    return (
      <div className="flex flex-col items-center" key={index}>
        <div className="relative top-0 max-h-[208px] max-w-[112px] overflow-hidden">
          <img
            src={'/background-2.png'}
            className="absolute aspect-[112/208]"
            alt="slot background"
          />
          <div
            data-spin={props.slot.shouldSpin}
            className="z-10 flex h-full w-full translate-x-0 flex-col items-center justify-center data-[spin=true]:animate-spin"
            onAnimationEnd={
              props.users.length - 1 === index ? onAnimationEnd : undefined
            }
            onAnimationStart={onAnimationStart}
            style={{ animationDelay: index * 200 + 'ms' }}
          >
            {getValues(user).map((item, index) => (
              <div
                key={index}
                className="flex h-[208px] items-center justify-center"
              >
                <span className="min-w-[112px] text-center text-[62px] font-semibold text-primary">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <label className="absolute bottom-0 w-full max-w-[112px] truncate text-center text-accent-content">
            {user.name}
          </label>
        </div>
      </div>
    )
  })
}

export default Slot
