import { useCallback, useEffect, useRef } from 'react'

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

  const play = useCallback(() => {
    audioRef.current.play()
  }, [])

  const pause = useCallback(() => {
    audioRef.current.pause()
  }, [])

  const reset = useCallback(() => {
    audioRef.current.pause()
    audioRef.current.currentTime = 0
  }, [])

  useEffect(() => {
    audioRef.current.src = audioPath
    audioRef.current.volume = context.volume
  }, [audioPath, context.volume])

  return {
    play,
    pause,
    reset,
  }
}
