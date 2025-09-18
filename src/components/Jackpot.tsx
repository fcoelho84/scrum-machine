import { type Room } from 'party/types'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useAudio } from '~/hooks/useAudio'
import { useRainCoin } from '~/hooks/useRainCoin'
import { useSlotContext } from './SlotMachine/context'
import CountUp from 'react-countup'
import Lottie from 'lottie-react'
import jackpot from '../lottie/jackpot.json'
import coin from '../lottie/coin.json'
import { useSocketMessage } from '~/hooks/useSocket'

enum states {
  waiting = 'waiting',
  running = 'running',
  finished = 'finished',
}

const Jackpot = () => {
  const [animation, setAnimation] = useState<states>(states.waiting)
  const slot = useSocketMessage<Room['slot']>((state) => state?.slot)
  const { canvasRef, initAnimation } = useRainCoin({
    onEnd: () => setAnimation(states.finished),
  })
  const sound = useAudio('/jackpot.mp3')
  const context = useSlotContext()
  const users = useSocketMessage<Room['users']>((state) =>
    state?.users.filter((user) => user.state === 'idle')
  )

  const initSound = useCallback(() => {
    sound.loop = false
    sound.play()
    sound.volume = 0.2
  }, [sound])

  const isJackpot = useMemo(() => {
    const votes = new Set(users.map((user) => user.point))
    return votes.size === 1
  }, [users])

  const handleInteractions = useCallback(() => {
    initAnimation()
    initSound()
  }, [initAnimation, initSound])

  useEffect(() => {
    if (slot.shouldSpin || users.length === 0) {
      setAnimation(states.waiting)
    }
  }, [slot.shouldSpin, users.length])

  useEffect(() => {
    if (animation === states.finished) return
    if (!isJackpot || !context.animationEnd) return

    setAnimation(states.running)
    initAnimation()
    initSound()
  }, [
    animation,
    context.animationEnd,
    handleInteractions,
    initAnimation,
    initSound,
    isJackpot,
  ])

  return (
    <>
      {animation === states.running && (
        <>
          <Lottie
            animationData={jackpot}
            autoplay={true}
            loop={false}
            className="absolute bottom-24 z-20 scale-y-[300%] md:bottom-0 md:scale-y-100"
          />
          <Lottie
            animationData={coin}
            autoplay={true}
            loop={false}
            className="absolute bottom-0 left-12 z-20"
          />
          <Lottie
            animationData={coin}
            autoplay={true}
            loop={false}
            className="absolute bottom-0 right-12 z-20"
          />
        </>
      )}

      <div
        style={{
          animationDelay: '0.4s',
        }}
        data-animate={animation === states.running}
        className="absolute z-20 flex w-[20px] scale-0 flex-col items-center justify-center rounded-full bg-black/25 p-4 data-[animate=true]:animate-scale-up"
      >
        <div className="z-15 absolute h-40 w-40 rotate-45 animate-shine rounded-3xl bg-secondary md:h-80 md:w-80" />
        <span className="animate-scale-up-down text-5xl text-primary md:text-9xl">
          <span className="animate-shine-text">JACKPOT</span>
        </span>
        {animation === states.running && (
          <CountUp
            className="text-1xl z-20 w-fit scale-0 animate-scale-up text-center delay-1000 md:text-3xl"
            end={9923495661}
            duration={5}
            prefix="R$ "
          />
        )}
      </div>
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
