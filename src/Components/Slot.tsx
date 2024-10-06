import { useMemo } from 'react'

interface SlotProps {
  value?: number
  items: string[]
  spin: boolean
  index?: number
}

const Slot = (props: SlotProps) => {
  const list = useMemo(() => {
    if (!props.spin && !props.value) {
      return ['']
    }

    if (props.value) {
      return ['✔️']
    }

    return [...props.items, props.value ?? '🤔'] ?? []
  }, [props.items, props.spin, props.value])

  return (
    <div className="relative top-0 max-h-[208px] max-w-fit overflow-hidden">
      <img src={'/background.png'} className="absolute aspect-[112/208]" />
      <div
        id="slot"
        data-spin={props.spin}
        className="z-10 flex h-full w-full flex-col items-center justify-center"
        style={{ animationDelay: (props.index ?? 0) * 200 + 'ms' }}
      >
        {list.map((item) => (
          <div
            key={item}
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
