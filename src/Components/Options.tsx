import { type Room } from 'party/types'
import { useEffect, useState } from 'react'
import { useSocket } from '~/hooks/useSocket'

const Options = (slot: Room['slot']) => {
  const [point, setPoint] = useState('')
  const socket = useSocket()

  useEffect(() => {
    if (slot.shouldSpin) {
      setPoint('')
    }
  }, [slot])

  const spin = () => {
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

  const choose = (point: string) => () => {
    setPoint(point)
    socket.send({
      type: 'user-update',
      data: {
        state: 'voted',
        id: socket.id,
        point,
      },
    })
  }

  const parsedValues = (slot?.values ?? []).filter(
    (value) => !isNaN(parseInt(value))
  )

  return (
    <div className="z-10 flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-4">
      {(parsedValues ?? []).map((item, key) => (
        <button
          data-active={point === item}
          className="min-w-[76px] data-[active=true]:brightness-50"
          key={key}
          onClick={choose(item)}
          disabled={slot.shouldSpin}
        >
          {item}
        </button>
      ))}
      <button
        className="ml-6 min-w-[76px]"
        onClick={spin}
        disabled={slot.shouldSpin}
      >
        Girar
      </button>
      <button
        className="min-w-[76px]"
        disabled={slot.shouldSpin}
        onClick={reset}
      >
        Reiniciar
      </button>
    </div>
  )
}

export default Options
