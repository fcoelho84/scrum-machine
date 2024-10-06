import { type z } from 'zod'
import { type RoomFindInput, type RoomFindOutput } from './router'
import { ramdomNumber } from '~/utils/numbers'

export type Query = z.infer<typeof RoomFindInput>

export type Output = z.infer<typeof RoomFindOutput>

export const getSlots = (
  optionsRaw = ['0', '0.5', '1', '2', '3', '5', '8', '13']
) => {
  const options: string[] = []
  const icons = ['🍺', '👌', '🤌', '💀', '🎃', '🦍', '🌟', '🔥', '❤️‍🩹']

  for (const number of optionsRaw) {
    options.push(icons[ramdomNumber(icons.length)]!)
    options.push(String(number))
  }

  return {
    options,
    optionsRaw,
  }
}

export const find = (query: Query): Output => {
  return {
    slot: getSlots(),
    users: [{ name: 'teste', point: 0, isAdmin: false }],
  }
}
