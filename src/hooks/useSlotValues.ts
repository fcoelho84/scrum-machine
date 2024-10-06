import { ramdomNumber } from '~/utils/numbers'

const icons = ['🍺', '👌', '🤌', '💀', '🎃', '🦍', '🌟', '🔥', '❤️‍🩹']

const numbers = [0, 0.5, 1, 2, 3, 5, 8, 13]

export const useSlotValues = (customValues = numbers) => {
  const slotValues: string[] = []

  for (const number of numbers) {
    slotValues.push(icons[ramdomNumber(icons.length)]!)
    slotValues.push(String(number))
  }

  return {
    slotValues,
    numbers: customValues,
  }
}
