import { MessageTypes, type Room } from 'party/types'
import { useEffect, useState } from 'react'
import { removeShuffleIcons } from '~/utils/slot'
import { useVotes } from '~/hooks/useVotes'
import { useSocketMessage, useSocketSendMessage } from '~/hooks/useSocket'
import { useSlotContext } from '~/pages/room/_Slot'

const Options = () => {
  const [point, setPoint] = useState('')
  const sendMessage = useSocketSendMessage()
  const users = useSocketMessage<Room['users']>((state) => state?.users)
  const slot = useSocketMessage<Room['slot']>((state) => state?.slot)
  const votes = useVotes(users ?? [])
  const context = useSlotContext()

  useEffect(() => {
    if (slot?.shouldSpin) setPoint('')
  }, [slot])

  const updateUserState = (value: string) => {
    if (value === point) return
    setPoint(value)
    sendMessage(MessageTypes.userUpdate, {
      state: 'voted',
      point: value,
    })
  }

  const onClick = (value: string) => async () => {
    updateUserState(value)
  }

  const spin = () => {
    context.setAnimationEnd(false)
    sendMessage(MessageTypes.slotUpdate, {
      shouldSpin: true,
    })
  }

  const reset = () => {
    sendMessage(MessageTypes.userUpdateBulk, {
      state: 'waiting',
    })
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
      <div className="flex gap-2">
        <button
          className="overflow-hidden rounded-xl border-2 border-slate-600/50 bg-slate-800/50 px-3 py-2 text-xs font-semibold text-slate-300 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:bg-slate-800/70 hover:text-white hover:shadow-xl hover:shadow-primary/20 active:scale-95 active:shadow-inner disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:border-slate-600/50 disabled:hover:bg-slate-800/50 disabled:hover:text-slate-300 disabled:hover:shadow-none disabled:active:scale-100 disabled:active:shadow-none sm:px-4 sm:py-2.5 sm:text-sm"
          disabled={slot?.shouldSpin || !votes.isIdle}
          onClick={reset}
        >
          <span className="flex items-center justify-center gap-1">
            <span>🔄</span>
            <span>Reiniciar</span>
          </span>
        </button>
        <button
          className="overflow-hidden rounded-xl bg-gradient-to-r from-primary to-accent px-3 py-2 text-xs font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 active:scale-95 active:shadow-inner disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-2xl disabled:active:scale-100 disabled:active:shadow-inner sm:px-4 sm:py-2.5 sm:text-sm"
          onClick={spin}
          disabled={slot?.shouldSpin || votes.isIdle || !votes.isVoted}
        >
          <span className="flex items-center justify-center gap-1">
            <span>🎰</span>
            <span>Girar</span>
          </span>
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {removeShuffleIcons(slot?.values ?? []).map((item, key) => (
          <button
            data-selected={point === item}
            className="h-12 w-12 overflow-hidden rounded-xl border-2 border-slate-600/50 bg-slate-800/50 text-sm font-semibold text-slate-300 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:bg-slate-800/70 hover:text-white hover:shadow-xl hover:shadow-primary/20 active:scale-95 active:shadow-inner disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:border-slate-600/50 disabled:hover:bg-slate-800/50 disabled:hover:text-slate-300 disabled:hover:shadow-none disabled:active:scale-100 disabled:active:shadow-none data-[selected=true]:border-primary data-[selected=true]:text-white data-[selected=true]:shadow-2xl data-[selected=true]:shadow-primary/30 sm:h-14 sm:w-14 sm:text-base"
            key={key}
            onClick={onClick(item)}
            disabled={slot?.shouldSpin ?? votes.isIdle}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Options
