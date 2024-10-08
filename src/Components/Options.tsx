import { type Poll } from 'party/types'
import { useSocket } from '~/hooks/useSocket'

const Options = (props: Poll) => {
  const socket = useSocket()

  const handle = (state: 'waiting' | 'spining' | 'stopped') => () => {
    socket.send(
      JSON.stringify({
        type: 'slot-machine-state',
        state,
      })
    )
  }

  const choose = (point: string) => () => {
    const userId = localStorage.getItem('user')
    if (!userId) return

    socket.send(
      JSON.stringify({
        type: 'user-point',
        userId,
        point,
      })
    )
  }

  return (
    <div className="z-10 flex flex-wrap gap-2">
      {(props.slot.values ?? []).map((item, key) => (
        <button className="min-w-[76px]" key={key} onClick={choose(item)}>
          {item}
        </button>
      ))}
      <button
        className="min-w-[76px]"
        onClick={handle('spining')}
        disabled={props.slot.state === 'spining'}
      >
        Girar
      </button>
      <button
        className="min-w-[76px]"
        onClick={handle('waiting')}
        disabled={props.slot.state === 'spining'}
      >
        Resetar
      </button>
    </div>
  )
}

export default Options
