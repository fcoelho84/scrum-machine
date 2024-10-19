import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
} from 'react'

type ToggleableFunction = () => void

export const useToggleable = (
  iniitialValue = false
): [boolean, ToggleableFunction, Dispatch<SetStateAction<boolean>>] => {
  const [toggle, setToggle] = useState(iniitialValue)
  const handleToggle = useCallback(() => setToggle((state) => !state), [])
  return [toggle, handleToggle, setToggle]
}
