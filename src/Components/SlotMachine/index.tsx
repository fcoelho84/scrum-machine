import React from 'react'

import { FaPlay } from 'react-icons/fa'
import Slot from './Slot'
import { type Room } from 'party/types'

const SlotMachine = (props: Room) => {
  return (
    <div className="relative m-auto flex max-w-fit flex-row flex-wrap items-center justify-center gap-2">
      <div className="absolute z-10 flex min-w-full flex-row items-center max-lg:hidden">
        <FaPlay className="absolute translate-x-[-6px] text-highlight" />
        <div className="h-[2px] w-full bg-highlight blur-[1px]" />
        <FaPlay className="absolute right-0 translate-x-[6px] rotate-180 text-highlight" />
      </div>
      {(props.users ?? []).map((user, index) => (
        <Slot
          user={user}
          slot={props.slot}
          key={user.id}
          delay={index * 200 + 'ms'}
          isLastChild={props.users.length - 1 === index}
        />
      ))}
    </div>
  )
}

export default SlotMachine
