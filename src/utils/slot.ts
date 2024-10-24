import { ramdomNumber } from './numbers'

export const options = [
  [
    '0',
    '0.5',
    '1',
    '2',
    '3',
    '5',
    '8',
    '13',
    '20',
    '40',
    '100',
    'ꝏ',
    '🤷🏻',
    '☕',
  ],
  ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '🤷🏻', '☕'],
  ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100', 'ꝏ'],
  ['0', '0.5', '1', '2', '3', '5', '8', '13', '20'],
  ['🤬', '💅', '🫦', '🖕🏻', '🛀🏼', '🦍', '🤌🏼', '🍻', '🚭', '👌🏼'],
]

export const shuffleSlotValues = (values = options[0]) => {
  const options: string[] = []
  const icons = ['🍺', '👌', '🤌', '💀', '🎃', '🦍', '🌟', '🔥', '❤️‍🩹']

  for (const number of values ?? []) {
    options.push(icons[ramdomNumber(icons.length)]!)
    options.push(String(number))
  }

  return options
}

export const removeShuffleIcons = (values: string[]) => {
  return values.filter(
    (value) =>
      !['🍺', '👌', '🤌', '💀', '🎃', '🦍', '🌟', '🔥', '❤️‍🩹'].includes(value)
  )
}
