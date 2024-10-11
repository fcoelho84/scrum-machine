import { type Room } from 'party/types'
import { memo, useEffect, useState } from 'react'
import { useJackpot } from '~/hooks/useJackpot'

const Jackpot = (props: Room) => {
  const { canvasRef, initAnimation } = useJackpot()
  const [isJackpot, setIsJackpot] = useState(false)

  useEffect(() => {
    if (props.users.length === 1 || props.slot.shouldSpin) return
    const values = new Set(props.users.map((user) => user.point))
    const states = props.users
      .map((user) => user.state)
      .filter((state) => state === 'idle')

    const jackpot = values.size === 1 && states.length === props.users.length
    if (jackpot) initAnimation()
    setIsJackpot(jackpot)
  }, [props.users, initAnimation, props.slot.shouldSpin])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute h-full w-full"
        width={800}
        height={800}
      />
      <span
        className="shine rounded-xl border-[4px] border-solid border-secondary/55 px-12 py-2 text-highlight transition-all"
        data-active={isJackpot}
      >
        <span className="flicker text-[96px] max-lg:text-[32px]">JA</span>
        <span className="flicker flicker-fast text-[96px] max-lg:text-[32px]">
          C
        </span>
        <span className="flicker text-[96px] max-lg:text-[32px]">K</span>
        <span className="flicker flicker-slow text-[96px] max-lg:text-[32px]">
          P
        </span>
        <span className="flicker flicker-fast text-[96px] max-lg:text-[32px]">
          OT
        </span>
      </span>
    </>
  )
}

export default memo(Jackpot)
