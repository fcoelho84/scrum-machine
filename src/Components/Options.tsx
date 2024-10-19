import { type Room } from 'party/types'
import { useEffect, useState } from 'react'
import { useSocket } from '~/hooks/useSocket'
import { api } from '~/utils/api'
import { useSlotContext } from './SlotMachine/context'
import { removeShuffleIcons } from '~/utils/slot'

const Options = (slot: Room['slot']) => {
  const [point, setPoint] = useState('')
  const socket = useSocket()
  const vote = api.room.vote.useMutation()
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

  const choose = (point: string) => async () => {
    setPoint(point)
    socket.send({
      type: 'user-update',
      data: {
        state: 'voted',
        id: socket.id,
        point: '🤫',
      },
    })
    if (!socket.roomId) return
    await vote.mutateAsync({
      id: socket.id,
      vote: point,
      roomId: socket.roomId,
    })
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
              onClick={choose(item)}
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
