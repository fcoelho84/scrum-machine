import { type Room } from 'party/types'
import { useMemo } from 'react'

export const useVotes = (users: Room['users']) => {
  const userStates = useMemo(
    () =>
      new Set(
        users
          .filter((user) => user.state !== 'spectator')
          .map((user) => user.state)
      ),
    [users]
  )

  const isIdle = useMemo(
    () => userStates.size === 1 && userStates.has('idle'),
    [userStates]
  )

  const isVoted = useMemo(
    () => userStates.size === 1 && userStates.has('voted'),
    [userStates]
  )

  return {
    isIdle,
    isVoted,
  }
}
