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
      .filter(({ state, point }) => state === 'idle' || point !== '')
      .map((user) => user.state)

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
        className="data-[jackpot=true]:animate-shine relative rounded-xl border-[4px] border-solid border-secondary/55 px-[2vw] py-[0.5vw] transition-all data-[jackpot=false]:text-highlight/35 data-[jackpot=false]:blur-[4px] max-sm:hidden"
        data-jackpot={isJackpot}
      >
        <span className="animate-flicker text-[5vw]">JA</span>
        <span className="animate-flicker text-[5vw] duration-[6s]">C</span>
        <span className="animate-flicker text-[5vw]">K</span>
        <span className="animate-flicker text-[5vw] duration-[12s]">P</span>
        <span className="animate-flicker text-[5vw] duration-[6s]">OT</span>
      </span>
    </>
  )
}

export default memo(Jackpot)
