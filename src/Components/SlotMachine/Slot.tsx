import { type Room } from 'party/types'
import { useMemo } from 'react'
import { useSocket } from '~/hooks/useSocket'

interface SlotProps {
  delay: string
  user: Room['users'][0]
  slot: Room['slot']
  isLastChild: boolean
}

const Slot = (props: SlotProps) => {
  const socket = useSocket()

  const onAnimationEnd = () => {
    socket.send({
      type: 'user-update-bulk',
      data: {
        state: 'idle',
      },
    })
    if (!props.isLastChild) return
    socket.send({
      type: 'slot-machine-state',
      data: {
        shouldSpin: false,
      },
    })
  }

  const list = useMemo(() => {
    if (props.user?.state === 'voted' && !props.slot.shouldSpin) {
      return ['✔️']
    }

    if (props.user?.state === 'idle' && !props.slot.shouldSpin) {
      return [props.user.point]
    }

    if (props.user?.state === 'waiting') {
      return ['🤔']
    }

    if (props.slot.shouldSpin) {
      return [...props.slot.values, props.user.point]
    }

    return props.slot.values
  }, [props])

  console.log(list)

  return (
    <div className="flex flex-col items-center">
      <div className="relative top-0 max-h-[208px] max-w-fit overflow-hidden">
        <img
          src={'/background.png'}
          className="absolute aspect-[112/208]"
          alt="slot background"
        />
        <div
          id="slot"
          data-spin={props.slot.shouldSpin}
          className="z-10 flex h-full w-full flex-col items-center justify-center"
          onAnimationEnd={onAnimationEnd}
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
      </div>
      <label className="max-w-[100px] truncate text-blueGray">
        {props.user.name}
      </label>
    </div>
  )
}

export default Slot
