import { type Room } from 'party/types'
import { memo, useEffect, useState } from 'react'
import { useAudio } from '~/hooks/useAudio'
import { useJackpot } from '~/hooks/useJackpot'
import { useSlotContext } from './SlotMachine/context'

const Jackpot = (props: Room) => {
  const [jackpot, setJackpot] = useState(false)
  const { canvasRef, initAnimation } = useJackpot()
  const sound = useAudio('/jackpot.mp3')
  const context = useSlotContext()

  useEffect(() => {
    console.log(context.animationEnd)
    if (
      props.users.length === 1 ||
      !props.slot.shouldSpin ||
      !context.animationEnd
    )
      return

    const values = new Set(props.users.map((user) => user.point))
    const states = props.users
      .filter(({ state, point }) => state === 'idle' || point != '')
      .map((user) => user.state)

    const jackpot = values.size === 1 && states.length === props.users.length
    setJackpot(jackpot)
    if (!jackpot) return
    initAnimation()
    sound.loop = false
    sound.play()
    sound.volume = 0.2
  }, [
    context.animationEnd,
    initAnimation,
    props.slot.shouldSpin,
    props.users,
    sound,
  ])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute h-full w-full"
        width={800}
        height={800}
      />
      <span
        className="relative rounded-xl border-[4px] border-solid border-secondary/55 px-[2vw] py-[0.5vw] transition-all data-[jackpot=true]:animate-shine data-[jackpot=false]:text-highlight/35 data-[jackpot=false]:blur-[4px] max-sm:hidden"
        data-jackpot={jackpot}
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
