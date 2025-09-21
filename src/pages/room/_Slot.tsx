import { type RoomUser, type Room, MessageTypes } from 'party/types'
import { useAudio } from '~/hooks/useAudio'
import { useCallback, useMemo } from 'react'
import { useSocketMessage, useSocketSendMessage } from '~/hooks/useSocket'

import { create } from 'zustand'
import { FaPlay } from 'react-icons/fa'

type State = {
  animationEnd: boolean
  setAnimationEnd: (state: boolean) => void
}

export const useSlotContext = create<State>((set) => ({
  animationEnd: false,
  setAnimationEnd: (state) => set(() => ({ animationEnd: state })),
}))

const Slot = () => {
  const sendMessage = useSocketSendMessage()
  const sound = useAudio('/spin.mp3')
  const context = useSlotContext()
  const slot = useSocketMessage<Room['slot']>((state) => state?.slot)
  const users = useSocketMessage<Room['users']>((state) => state?.users)

  const onAnimationStart = () => {
    if (slot?.shouldSpin) {
      sound.play()
      return
    }

    sound.pause()
    sound.currentTime = 0
  }

  const onLastChildAnimationEnd = (userId: string) => {
    const lastUser = (users ?? []).pop()
    if (userId !== lastUser?.id) return
    context.setAnimationEnd(true)
    sendMessage(MessageTypes.slotUpdate, {
      shouldSpin: false,
    })
  }

  const onAnimationEnd = (userId: string) => () => {
    sendMessage(MessageTypes.userUpdateBulk, {
      state: 'idle',
    })
    onLastChildAnimationEnd(userId)
  }

  const getValues = useCallback(
    (user: RoomUser) => {
      const vote = user.point || '👀'

      if (user?.state === 'voted' && !slot?.shouldSpin) {
        return ['✔️']
      }

      if (user?.state === 'idle' && !slot?.shouldSpin) {
        return [vote]
      }

      if (user?.state === 'waiting') {
        return ['🤔']
      }

      if (slot?.shouldSpin) {
        return [...(slot?.values ?? []), vote]
      }

      return slot?.values ?? []
    },
    [slot?.shouldSpin, slot?.values]
  )

  const shouldAnimte = useCallback(
    (user: RoomUser, index: number) => {
      if (user?.state !== 'idle') return false

      const value = user.point ?? null
      const neighborPrev = (users ?? [])[index - 1]?.point ?? null
      const neighborNext = (users ?? [])[index + 1]?.point ?? null

      const hasNeighborEqual = value === neighborPrev || value === neighborNext

      return hasNeighborEqual && value !== null
    },
    [users]
  )

  const nonSpectators = useMemo(
    () => users?.filter((user) => user.state !== 'spectator') ?? [],
    [users]
  )

  return nonSpectators.map((user, index) => {
    return (
      <div
        className="relative m-auto flex max-w-fit flex-row flex-wrap items-center justify-center gap-2 rounded-lg border border-solid border-primary"
        key={index}
      >
        <div className="absolute z-10 flex min-w-full flex-row items-center max-lg:hidden">
          <FaPlay className="absolute translate-x-[-6px] text-primary" />
          <div className="h-[2px] w-full bg-primary blur-[1px]" />
          <FaPlay className="absolute right-0 translate-x-[6px] rotate-180 text-primary" />
        </div>
        <div className="flex flex-col items-center" key={index}>
          <div className="relative top-0 max-h-[208px] max-w-[112px] overflow-hidden">
            <img
              src={'/background-2.png'}
              className="absolute aspect-[112/208]"
              alt="slot background"
            />
            <div
              data-spin={slot?.shouldSpin}
              className="z-10 flex h-full w-full translate-x-0 flex-col items-center justify-center data-[spin=true]:animate-spin"
              onAnimationEnd={onAnimationEnd(user.id)}
              onAnimationStart={onAnimationStart}
              style={{ animationDelay: index * 500 + 'ms' }}
            >
              {getValues(user).map((item, key) => (
                <div
                  key={key}
                  className="flex h-[208px] items-center justify-center"
                >
                  <span
                    data-animate={shouldAnimte(user, index)}
                    className="min-w-[112px] text-center text-[62px] font-semibold text-primary data-[animate=true]:animate-glow-bounce"
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <label className="absolute bottom-0 w-full max-w-[112px] truncate text-center text-accent-content">
              {user.name}
            </label>
          </div>
        </div>
      </div>
    )
  })
}

export default Slot
