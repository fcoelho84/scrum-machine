import { type Room } from 'party/types'

type UserState = Room['users'][0]['state']

export const useVotes = (users: Room['users']) => {
  const onlyState = new Set(users.map((user) => user.state))

  return {
    isAll: (state: UserState) => onlyState.size === 1 && onlyState.has(state),
  }
}
