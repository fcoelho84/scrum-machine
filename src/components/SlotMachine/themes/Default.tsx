import React, { type PropsWithChildren } from 'react'

import { FaPlay } from 'react-icons/fa'

const Default = (props: PropsWithChildren) => {
  return (
    <div className="relative m-auto flex max-w-fit flex-row flex-wrap items-center justify-center gap-2">
      <div className="absolute z-10 flex min-w-full flex-row items-center max-lg:hidden">
        <FaPlay className="absolute translate-x-[-6px] text-primary" />
        <div className="h-[2px] w-full bg-primary blur-[1px]" />
        <FaPlay className="absolute right-0 translate-x-[6px] rotate-180 text-primary" />
      </div>
      {props.children}
    </div>
  )
}

export default Default
