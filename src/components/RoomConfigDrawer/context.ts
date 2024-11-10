import { create } from 'zustand'

type State = {
  theme: string
  isSpectator: boolean
  toggleSpectatorMode: () => void
  setTheme: (state: string) => void
}

export const useConfigContext = create<State>((set) => ({
  theme: 'default',
  isSpectator: false,
  toggleSpectatorMode: () =>
    set(({ isSpectator }) => ({ isSpectator: !isSpectator })),
  setTheme: (state) => set(() => ({ theme: state })),
}))
