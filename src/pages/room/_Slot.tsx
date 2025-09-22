import { type RoomUser, type Room, MessageTypes } from 'party/types'
import { useAudio } from '~/hooks/useAudio'
import { useCallback, useMemo, useEffect, useState } from 'react'
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
  const [isClient, setIsClient] = useState(false)
  const sendMessage = useSocketSendMessage()
  const sound = useAudio('/spin.mp3')
  const context = useSlotContext()
  const slot = useSocketMessage<Room['slot']>((state) => state?.slot)
  const users = useSocketMessage<Room['users']>((state) => state?.users)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleAnimationStart = () => {
    if (slot?.shouldSpin) return sound.play()
    sound.reset()
  }

  const handleAnimationEnd = (userId: string) => () => {
    sendMessage(MessageTypes.userUpdateBulk, { state: 'idle' })
    const lastUser = users?.filter((u) => u.state !== 'spectator').pop()

    if (userId !== lastUser?.id) return

    context.setAnimationEnd(true)
    sendMessage(MessageTypes.slotUpdate, { shouldSpin: false })
  }

  const getUserValues = useCallback(
    (user: RoomUser) => {
      const vote = user.point || '👀'
      const isSpinning = slot?.shouldSpin

      if (user.state === 'voted' && !isSpinning) return ['✔️']
      if (user.state === 'idle' && !isSpinning) return [vote]
      if (user.state === 'waiting') return ['🤔']
      if (isSpinning) return [...(slot?.values ?? []), vote]

      return slot?.values ?? []
    },
    [slot?.shouldSpin, slot?.values]
  )

  const activeUsers = useMemo(
    () => users?.filter((user) => user.state !== 'spectator') ?? [],
    [users]
  )

  if (!isClient) {
    return null
  }

  return activeUsers.map((user, index) => {
    return (
      <div
        className="relative m-auto flex max-w-fit flex-row flex-wrap items-center justify-center gap-2 rounded-lg border border-solid border-slate-600/50"
        key={index}
      >
        <div className="absolute z-10 flex min-w-full flex-row items-center max-lg:hidden">
          <FaPlay className="absolute translate-x-[-6px] text-slate-600/50" />
          <div className="h-[2px] w-full bg-slate-600/50 blur-[1px]" />
          <FaPlay className="absolute right-0 translate-x-[6px] rotate-180 text-slate-600/50" />
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
              onAnimationEnd={handleAnimationEnd(user.id)}
              onAnimationStart={handleAnimationStart}
              style={{ animationDelay: index * 500 + 'ms' }}
            >
              {getUserValues(user).map((item, key) => (
                <div
                  key={key}
                  className="flex h-[208px] items-center justify-center"
                >
                  <span className="min-w-[112px] text-center text-[62px] font-semibold text-primary">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <label className="absolute bottom-0 w-full max-w-[112px] truncate text-center text-slate-300">
              {user.name}
            </label>
          </div>
        </div>
      </div>
    )
  })
}

export default Slot
