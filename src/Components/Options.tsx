import { type Room } from 'party/types'
import { useEffect, useState } from 'react'
import { useSocket } from '~/hooks/useSocket'
import { api } from '~/utils/api'
import { useSlotContext } from './SlotMachine/context'
import { removeShuffleIcons } from '~/utils/slot'

const Options = (slot: Room['slot']) => {
  const [point, setPoint] = useState('')
  const socket = useSocket()
  const { mutateAsync } = api.room.vote.useMutation()
  const context = useSlotContext()

  useEffect(() => {
    if (slot.shouldSpin) {
      setPoint('')
    }
  }, [slot])

  const spin = () => {
    context.setAnimationEnd(false)
    socket.send({
      type: 'slot-machine-state',
      data: {
        shouldSpin: true,
      },
    })
  }

  const reset = () => {
    socket.send({
      type: 'user-update-bulk',
      data: {
        state: 'waiting',
      },
    })
  }

  const updateUserVote = async (value: string) => {
    if (!socket.roomId) return
    await mutateAsync({
      id: socket.id,
      vote: value,
      roomId: socket.roomId,
    })
  }

  const updateSocketUserState = (value: string) => {
    socket.send({
      type: 'user-update',
      data: {
        state: value === point ? 'waiting' : 'voted',
        id: socket.id,
        point: '🤫',
      },
    })
  }

  const onClick = (value: string) => async () => {
    setPoint((vote) => (vote === value ? '' : value))
    updateSocketUserState(value)
    updateUserVote(value)
  }

  return (
    <>
      <div className="z-10 w-full overflow-hidden">
        <div className="flex gap-2 overflow-x-auto md:justify-center">
          {removeShuffleIcons(slot?.values ?? []).map((item, key) => (
            <button
              data-active={point === item}
              className="min-w-[65px] data-[active=true]:brightness-50 max-md:text-[16px] md:min-w-[98px]"
              key={key}
              onClick={onClick(item)}
              disabled={slot.shouldSpin}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="z-10 flex w-full flex-wrap justify-center gap-2 max-md:justify-between">
        <button
          className="max-md:text-[16px]"
          disabled={slot.shouldSpin}
          onClick={reset}
        >
          Reiniciar
        </button>
        <button
          className="max-md:text-[16px]"
          onClick={spin}
          disabled={slot.shouldSpin}
        >
          Girar
        </button>
      </div>
    </>
  )
}

export default Options
