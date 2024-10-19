import { type Room } from 'party/types'
import { DetailedHTMLProps, useMemo } from 'react'
import { useAudio } from '~/hooks/useAudio'
import { useSocket } from '~/hooks/useSocket'
import { useSlotContext } from './context'

interface SlotProps {
  delay: string
  user: Room['users'][0]
  slot: Room['slot']
  isLastChild: boolean
}

const Slot = (props: SlotProps) => {
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
    if (!props.isLastChild) return
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

  const list = useMemo(() => {
    const vote = props.user.point || '👀'

    if (props.user?.state === 'voted' && !props.slot.shouldSpin) {
      return ['✔️']
    }

    if (props.user?.state === 'idle' && !props.slot.shouldSpin) {
      return [vote]
    }

    if (props.user?.state === 'waiting') {
      return ['🤔']
    }

    if (props.slot.shouldSpin) {
      return [...props.slot.values, vote]
    }

    return props.slot.values
  }, [props])

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="relative top-0 max-h-[208px] max-w-[112px] overflow-hidden">
          <img
            src={'/background.png'}
            className="absolute aspect-[112/208]"
            alt="slot background"
          />
          <div
            data-spin={props.slot.shouldSpin}
            className="z-10 flex h-full w-full translate-x-0 flex-col items-center justify-center data-[spin=true]:animate-spin"
            onAnimationEnd={onAnimationEnd}
            onAnimationStart={onAnimationStart}
            style={{ animationDelay: props.delay }}
          >
            {list.map((item, index) => (
              <div
                key={index}
                className="flex h-[208px] items-center justify-center"
              >
                <span className="min-w-[112px] text-center text-[62px] font-semibold text-highlight">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <label className="absolute bottom-0 w-full max-w-[112px] truncate text-center text-blueGray">
            {props.user.name}
          </label>
        </div>
      </div>
    </>
  )
}

export default Slot
