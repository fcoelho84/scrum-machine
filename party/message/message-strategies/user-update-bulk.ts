import { type Room, type UserUpdateBulk } from 'party/types'
import { Strategy } from '../abstract.strategy'

export class UserUpdateBulkStategy extends Strategy {
  handle(data: UserUpdateBulk['data'], state: Room) {
    state.users = state.users.map((user) => {
      if (user.state === 'spectator') return user

      return {
        ...user,
        ...data,
      }
    })
    return state
  }
}
