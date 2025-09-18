import { MessageTypes } from 'party/types'
import { type ChangeEvent } from 'react'
import { options, shuffleSlotValues } from '~/utils/slot'
import { useSocketSendMessage } from '~/hooks/useSocket'

const Values = () => {
  const sendMessage = useSocketSendMessage()

  const selectValue = (event: ChangeEvent<HTMLSelectElement>) => {
    const index = event.currentTarget.value ?? 0

    sendMessage(MessageTypes.slotUpdate, {
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
