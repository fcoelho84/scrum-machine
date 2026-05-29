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
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-40 w-full max-w-sm -translate-x-1/2 sm:h-48 sm:max-w-md"
        width={800}
        height={800}
      />
      <div
        data-hidden={animation !== states.running}
        className="absolute inset-x-0 top-0 z-10 flex justify-center px-4 pt-14 sm:pt-16"
      >
        <div
          data-animate={animation === states.running}
          className="delay-400 relative flex w-full max-w-xs scale-0 flex-col items-center justify-center sm:max-w-sm data-[animate=true]:animate-scale-up"
        >
          <div className="absolute inset-0 rounded-2xl border border-primary/30 bg-slate-800/30 p-4 shadow-2xl backdrop-blur-sm sm:p-5" />
          <div className="absolute -inset-1 animate-rotate rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-sm" />
          <div className="absolute inset-3 h-14 w-14 rotate-45 animate-shine rounded-2xl bg-secondary/50 sm:h-16 sm:w-16" />

          <div className="relative z-20 p-3 text-center sm:p-4">
            <h1 className="mb-2 text-2xl font-bold sm:mb-3 sm:text-3xl">
              <span className="animate-pulse bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                JACK
              </span>
              <span className="ml-1.5 animate-pulse bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent delay-500 sm:ml-2">
                POT
              </span>
            </h1>

            <div
              className="animate-fade-in"
              data-hidden={animation !== states.running}
            >
              <div className="mb-1.5 rounded-lg border border-accent/30 bg-slate-800/50 px-4 py-2 backdrop-blur-sm">
                {animation === states.running && (
                  <CountUp
                    className="text-lg font-bold text-accent sm:text-xl"
                    end={jackpotValue}
                    duration={5}
                    prefix="R$ "
                    separator="."
                    decimal=","
                  />
                )}
              </div>
              <p className="text-xs text-slate-300 sm:text-sm">
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
