import { create } from 'zustand'

type State = {
  animationEnd: boolean
  setAnimationEnd: (state: boolean) => void
}

export const useSlotContext = create<State>((set) => ({
  animationEnd: false,
  setAnimationEnd: (state) => set(() => ({ animationEnd: state })),
}))
