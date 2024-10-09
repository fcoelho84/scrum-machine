import { useCallback, useState } from 'react'

type ToggleableFunction = () => void

export const useToggleable = (): [boolean, ToggleableFunction] => {
  const [toggle, setToggle] = useState(false)
  const handleToggle = useCallback(() => setToggle((state) => !state), [])
  return [toggle, handleToggle]
}
