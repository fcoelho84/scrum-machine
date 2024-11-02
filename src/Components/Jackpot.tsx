import { type Room } from 'party/types'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useAudio } from '~/hooks/useAudio'
import { useRainCoin } from '~/hooks/useRainCoin'
import { useSlotContext } from './SlotMachine/context'
import { mostRepeatedNumber } from '~/utils/numbers'

const Jackpot = (props: Room) => {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const { canvasRef, initAnimation } = useRainCoin()
  const sound = useAudio('/jackpot.mp3')
  const context = useSlotContext()

  const initSound = useCallback(() => {
    sound.loop = false
    sound.play()
    sound.volume = 0.2
  }, [sound])

  const isJackpot = useMemo(() => {
    const votes =
      props.users
        .filter(({ state, point }) => state === 'idle' && point != '')
        .map((user) => user.point) ?? []

    return (
      new Set(votes).size === 1 &&
      votes.length === props.users.length &&
      props.users.length > 1
    )
  }, [props.users])

  const repeatedNumber = useMemo(() => {
    const users = props.users ?? []

    if (users.find((user) => user.state !== 'idle')) return '🤔'

    return mostRepeatedNumber(users.map(({ point }) => point))
  }, [props.users])

  const handleInteractions = useCallback(() => {
    initAnimation()
    initSound()
  }, [initAnimation, initSound])

  useEffect(() => {
    setShouldAnimate(isJackpot && context.animationEnd)
    if (!props.slot.shouldSpin || !context.animationEnd || !isJackpot) return
    handleInteractions()
  }, [
    context.animationEnd,
    handleInteractions,
    isJackpot,
    props.slot.shouldSpin,
  ])

  return (
    <>
      <span
        className="relative rounded-xl border-[4px] border-solid border-secondary/55 px-[2vw] py-[0.5vw] text-primary transition-colors data-[jackpot=true]:animate-shine data-[jackpot=false]:text-primary/35 max-sm:hidden"
        data-jackpot={shouldAnimate}
      >
        <span className="animate-flicker text-[5vw]">JA</span>
        <span className="text-[5vw]">C</span>
        <span className="text-[5vw]">K</span>
        <span className="animate-flicker text-[5vw]">P</span>
        <span className="text-[5vw]">OT</span>
        <span className="animate-flicker px-4 text-[5vw]">-</span>
        <span className="text-[5vw]">{repeatedNumber}</span>
      </span>
      <canvas
        ref={canvasRef}
        className="absolute h-full w-full"
        width={800}
        height={800}
      />
    </>
  )
}

export default memo(Jackpot)
