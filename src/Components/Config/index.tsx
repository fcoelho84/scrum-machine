import { type ChangeEvent } from 'react'
import { useSocket } from '~/hooks/useSocket'
import { shuffleSlotValues } from '~/utils/slot'
import Ticket from './Ticket'
import { useAudioContext } from '~/hooks/useAudio'

const options = [
  [
    '0',
    '0.5',
    '1',
    '2',
    '3',
    '5',
    '8',
    '13',
    '20',
    '40',
    '100',
    'ꝏ',
    '🤷🏻',
    '☕',
  ],
  ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '🤷🏻', '☕'],
  ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100', 'ꝏ'],
  ['0', '0.5', '1', '2', '3', '5', '8', '13', '20'],
  ['🤬', '💅', '🫦', '🖕🏻', '🛀🏼', '🦍', '🤌🏼', '🍻', '🚭', '👌🏼'],
]

const Config = () => {
  const audioContext = useAudioContext()
  const socket = useSocket()

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const index = event.currentTarget.value ?? 0

    socket.send({
      type: 'slot-machine-state',
      data: {
        values: shuffleSlotValues(options[parseInt(index)]),
      },
    })
  }

  const handleVolume = (event: ChangeEvent<HTMLInputElement>) => {
    audioContext.setVolume(parseFloat(event.currentTarget.value))
  }

  return (
    <Ticket>
      <div className="flex h-fit w-full items-center gap-2">
        <label className="mb-1text-primary/85">Volume:</label>
        <input
          type="range"
          className="w-full"
          onChange={handleVolume}
          min="0.0"
          max="1.0"
          step="0.1"
        />
      </div>

      <div className="flex h-fit w-full items-center gap-2">
        <label className="mb-1text-primary/85">Opções:</label>
        <select className="h-fit w-full" onChange={handleSelect}>
          {options.map((value, key) => (
            <option key={key} className="font-pixelify" value={key}>
              {value.join(',')}
            </option>
          ))}
        </select>
      </div>
    </Ticket>
  )
}

export default Config
