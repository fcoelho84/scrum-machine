import { type Room } from 'party/types'
import { useSocket } from '~/hooks/useSocket'
import { useUser } from '~/hooks/useUser'

const Options = (slot: Room['slot']) => {
  const [userId] = useUser()
  const socket = useSocket()

  const spin = () => {
    socket.send({
      type: 'slot-machine-state',
      data: {
        shouldSpin: true,
      },
    })
  }

  const reset = () => {
    if (!userId) return

    socket.send({
      type: 'user-update-bulk',
      data: {
        state: 'waiting',
      },
    })
  }

  const choose = (point: string) => () => {
    if (!userId) return

    socket.send({
      type: 'user-update',
      data: {
        state: 'voted',
        userId,
        point,
      },
    })
  }

  const parsedValues = slot.values.filter((value) => !isNaN(parseInt(value)))

  return (
    <div className="z-10 flex flex-wrap gap-2">
      {(parsedValues ?? []).map((item, key) => (
        <button
          className="min-w-[76px]"
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
