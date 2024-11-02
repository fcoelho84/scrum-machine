import { create } from 'zustand'

type State = {
  theme: string
  setTheme: (state: string) => void
}

export const useConfigContext = create<State>((set) => ({
  theme: 'default',
  setTheme: (state) => set(() => ({ theme: state })),
}))
