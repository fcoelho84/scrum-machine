import { useEffect, useRef } from 'react'

import { create } from 'zustand'

type State = {
  volume: number
  setVolume: (state: number) => void
}

export const useAudioContext = create<State>((set) => ({
  volume: 0.3,
  setVolume: (state) => set(() => ({ volume: state })),
}))

export const useAudio = (audioPath: string) => {
  const context = useAudioContext()
  const audioRef = useRef(document.createElement('audio'))

  useEffect(() => {
    audioRef.current.src = audioPath
    audioRef.current.volume = context.volume
  }, [audioPath, context.volume])

  return audioRef.current
}
