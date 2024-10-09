import { useCallback, useMemo } from 'react'

export const useUser = (): [string | null, (id: string) => void] => {
  const userId = useMemo(() => {
    if (typeof window === 'undefined') return null
    return window.sessionStorage.getItem('userId')
  }, [])

  const update = useCallback((userId: string) => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('userId', userId)
    }
  }, [])

  return [userId, update]
}
