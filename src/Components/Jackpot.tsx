import { memo } from 'react'
import { ramdomNumber } from '~/utils/numbers'

interface JackpotLogo {
  active: boolean
}

const flickerAnimClass = ['flicker', 'flicker-fast', 'flicker-slow', '', '']

const Jackpot = (props: JackpotLogo) => {
  return (
    <span
      className="shine rounded-xl border-[4px] border-solid border-secondary/55 px-12 py-2 text-highlight transition-all"
      data-active={props.active}
    >
      {'JACKPOT'.split('').map((letter, index) => (
        <span
          className={`text-[96px] max-lg:text-[32px] ${flickerAnimClass[ramdomNumber(flickerAnimClass?.length)]}`}
          key={index}
        >
          {letter}
        </span>
      ))}
    </span>
  )
}

export default memo(Jackpot)