import { type Poll } from 'party/types'
import { useMemo } from 'react'
import { useSocket } from '~/hooks/useSocket'
import { ramdomNumber } from '~/utils/numbers'

interface SlotProps {
  delay: string
  user: Poll['users'][0]
  slot: Poll['slot']
  isLastChild: boolean
}

const Slot = (props: SlotProps) => {
  const socket = useSocket()

  const onAnimationEnd = () => {
    if (!props.isLastChild) return
    socket.send(
      JSON.stringify({
        type: 'slot-machine-state',
        state: 'stopped',
      })
    )
  }

  const list = useMemo(() => {
    if (props.slot?.state === 'stopped') {
      return [props.user.point]
    }

    if (props.slot?.state === 'waiting' && !props.user.point) {
      return ['🤔']
    }

    if (props.user.point && props.slot?.state !== 'spining') {
      return ['✔️']
    }

    const options: string[] = []
    const icons = ['🍺', '👌', '🤌', '💀', '🎃', '🦍', '🌟', '🔥', '❤️‍🩹']

    for (const number of props.slot?.values ?? []) {
      options.push(icons[ramdomNumber(icons.length)]!)
      options.push(String(number))
    }

    return [...options, props.user.point]
  }, [props])

  return (
    <div className="relative top-0 max-h-[208px] max-w-fit overflow-hidden">
      <img
        src={'/background.png'}
        className="absolute aspect-[112/208]"
        alt="slot background"
      />
      <div
        id="slot"
        data-spin={props.slot?.state === 'spining'}
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
  )
}

export default Slot
