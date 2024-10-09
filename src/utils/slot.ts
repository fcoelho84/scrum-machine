import { ramdomNumber } from './numbers'

export const shuffleSlotValues = (
  values = ['0', ' 0.5', '1', '2', '3', '5', '8', '13']
) => {
  const options: string[] = []
  const icons = ['🍺', '👌', '🤌', '💀', '🎃', '🦍', '🌟', '🔥', '❤️‍🩹']

  for (const number of values ?? []) {
    options.push(icons[ramdomNumber(icons.length)]!)
    options.push(String(number))
  }

  return options
}
