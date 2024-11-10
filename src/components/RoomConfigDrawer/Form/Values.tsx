import { MessageTypes } from 'party/types'
import { type ChangeEvent } from 'react'
import { useSocket } from '~/hooks/useSocket'
import { options, shuffleSlotValues } from '~/utils/slot'

const Values = () => {
  const socket = useSocket()

  const selectValue = (event: ChangeEvent<HTMLSelectElement>) => {
    const index = event.currentTarget.value ?? 0

    socket.send(MessageTypes.slotUpdate, {
      values: shuffleSlotValues(options[parseInt(index)]),
    })
  }

  return (
    <select
      className="select select-bordered h-fit w-full"
      onChange={selectValue}
    >
      <option disabled selected>
        Pontuações
      </option>
      {options.map((value, key) => (
        <option key={key} value={key}>
          {value.join(',')}
        </option>
      ))}
    </select>
  )
}

export default Values
