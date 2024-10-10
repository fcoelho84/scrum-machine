import { type Room } from 'party/types'
import { memo, useEffect, useState } from 'react'
import { useJackpot } from '~/hooks/useJackpot'
import { ramdomNumber } from '~/utils/numbers'

const flickerAnimClass = ['flicker', 'flicker-fast', 'flicker-slow', '', '']

const classNames = flickerAnimClass[ramdomNumber(flickerAnimClass?.length)]

const Jackpot = (props: { users: Room['users'] }) => {
  const { canvasRef, initAnimation } = useJackpot()
  const [isJackpot, setIsJackpot] = useState(false)

  useEffect(() => {
    if (props.users.length <= 1) return

    const values = new Set(props.users.map((user) => user.point))
    const state = new Set(
      props.users.map((user) => user.state).filter((state) => state === 'idle')
    )
    const jackpot = values.size === 1 && state.size == 1
    if (jackpot) initAnimation()
    setIsJackpot(jackpot)
  }, [props.users, initAnimation])

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
        {'JACKPOT'.split('').map((letter, index) => (
          <span
            className={`text-[96px] max-lg:text-[32px] ${classNames}`}
            key={index}
          >
            {letter}
          </span>
        ))}
      </span>
    </>
  )
}

export default memo(Jackpot)
