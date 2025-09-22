import { type Room } from 'party/types'
import { memo, useEffect, useMemo, useState } from 'react'
import { useRainCoin } from '~/hooks/useRainCoin'
import CountUp from 'react-countup'
import { useSocketMessage } from '~/hooks/useSocket'
import { useSlotContext } from '~/pages/room/_Slot'

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
  const context = useSlotContext()
  const users = useSocketMessage<Room['users']>((state) => state?.users)

  const isJackpot = useMemo(() => {
    const votes = new Set((users ?? []).map((user) => user.point))
    return votes.size === 1
  }, [users])

  const jackpotValue = useMemo(() => {
    if (!isJackpot || !users?.length) return 0

    const { point } = users[0] ?? { point: '0' }

    if (!point) return 0

    const pointValue = parseInt(point) || 0
    const multiplier = Math.floor(Math.random() * 9000) + 1000
    return pointValue * multiplier
  }, [isJackpot, users])

  useEffect(() => {
    if (slot?.shouldSpin || (users ?? []).length === 0) {
      setAnimation(states.waiting)
    }
  }, [slot, users])

  useEffect(() => {
    if (animation === states.finished) return
    if (!isJackpot || !context.animationEnd) return

    setAnimation(states.running)
    initAnimation()
  }, [animation, context.animationEnd, initAnimation, isJackpot])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute -z-10 h-full w-full"
        width={800}
        height={800}
      />
      <div
        data-hidden={animation !== states.running}
        className="absolute z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8"
      >
        <div
          data-animate={animation === states.running}
          className="delay-400 relative flex scale-0 flex-col items-center justify-center data-[animate=true]:animate-scale-up"
        >
          <div className="absolute inset-0 rounded-3xl border border-primary/30 bg-slate-800/30 p-8 shadow-2xl backdrop-blur-sm md:p-12" />
          <div className="absolute -inset-2 animate-rotate rounded-3xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-sm" />
          <div className="absolute inset-4 h-32 w-32 rotate-45 animate-shine rounded-3xl bg-secondary/50 md:h-64 md:w-64" />

          <div className="relative z-20 p-4 text-center">
            <h1 className="mb-4 text-4xl font-bold md:mb-6 md:text-6xl lg:text-8xl">
              <span className="animate-pulse bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                JACK
              </span>
              <span className="ml-2 animate-pulse bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent delay-500 md:ml-4">
                POT
              </span>
            </h1>

            <div
              className="animate-fade-in"
              data-hidden={animation !== states.running}
            >
              <div className="mb-2 rounded-xl border border-accent/30 bg-slate-800/50 px-6 py-3 backdrop-blur-sm">
                {animation === states.running && (
                  <CountUp
                    className="text-2xl font-bold text-accent md:text-4xl"
                    end={jackpotValue}
                    duration={5}
                    prefix="R$ "
                    separator="."
                    decimal=","
                  />
                )}
              </div>
              <p className="text-sm text-slate-300 md:text-base">
                🎉 Parabéns! Todos votaram no mesmo valor! 🎉
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(Jackpot)
