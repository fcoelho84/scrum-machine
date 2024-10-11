import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
} from 'react'

type ToggleableFunction = () => void

export const useToggleable = (): [
  boolean,
  ToggleableFunction,
  Dispatch<SetStateAction<boolean>>,
] => {
  const [toggle, setToggle] = useState(false)
  const handleToggle = useCallback(() => setToggle((state) => !state), [])
  return [toggle, handleToggle, setToggle]
}
