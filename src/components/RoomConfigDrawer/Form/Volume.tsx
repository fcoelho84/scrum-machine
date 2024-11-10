import { type ChangeEvent } from 'react'
import { useAudioContext } from '~/hooks/useAudio'

const Volume = () => {
  const audioContext = useAudioContext()

  const handleVolume = (event: ChangeEvent<HTMLInputElement>) => {
    audioContext.setVolume(parseFloat(event.currentTarget.value))
  }

  return (
    <div className="flex h-fit w-full items-center gap-2">
      <label className="mb-1text-primary/85">Volume:</label>

      <input
        type="range"
        className="range range-xs w-full"
        onChange={handleVolume}
        min="0.0"
        max="1.0"
        step="0.1"
      />
    </div>
  )
}

export default Volume
