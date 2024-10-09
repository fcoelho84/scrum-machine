import { type Room } from 'party/types'
import { memo, useMemo } from 'react'
import { ramdomNumber } from '~/utils/numbers'

const flickerAnimClass = ['flicker', 'flicker-fast', 'flicker-slow', '', '']

const Jackpot = (props: { users: Room['users'] }) => {
  const isJackpot = useMemo(() => {
    const values = new Set(props.users.map((user) => user.point))
    const state = new Set(props.users.map((user) => user.state))
    return values.size === 1 && state.size == 1
  }, [props])

  const classNames = useMemo(
    () => flickerAnimClass[ramdomNumber(flickerAnimClass?.length)],
    []
  )

  return (
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
  )
}

export default memo(Jackpot)
