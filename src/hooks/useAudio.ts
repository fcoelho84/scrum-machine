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
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = useCallback(() => {
    audioRef.current?.play()
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const reset = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [])

  const toggleLoop = useCallback((active: boolean) => {
    if (audioRef.current) {
      audioRef.current.loop = active
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = document.createElement('audio')
    }
    if (audioRef.current) {
      audioRef.current.src = audioPath
      audioRef.current.volume = context.volume
    }
  }, [audioPath, context.volume])

  return {
    play,
    pause,
    reset,
    toggleLoop,
  }
}
