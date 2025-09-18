export const ramdomNumber = (max = 0) => {
  return Math.ceil(Math.floor(Math.random() * max))
}

export const mostRepeatedNumber = (values: string[]) => {
  const count: Record<string, number> = {}

  for (const value of values) {
    count[value] = (count[value] ?? 0) + 1
  }

  let mostRepeated = null
  let maxCount = 0

  for (const [value, cnt] of Object.entries(count)) {
    if (cnt > maxCount) {
      maxCount = cnt
      mostRepeated = value
    }
  }

  if (!mostRepeated) return null
  return mostRepeated
}
