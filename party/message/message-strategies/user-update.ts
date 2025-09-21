import { type UserUpdate, type Room } from 'party/types'
import { Strategy } from '../abstract.strategy'

export class UserUpdateStategy extends Strategy {
  async handle(data: UserUpdate['data'], state: Room) {
    const newData = await this.removeSpectatorVote(data)
    return this.updateUser(newData, state)
  }

  private async updateUser(data: UserUpdate['data'], state: Room) {
    if (data.state === 'voted' && data.point) {
      this.getStorageInstance().saveVote(data.id, data.point)
    }

    state.users = this.updateCurrentUser(data, state)
    return state
  }

  private updateCurrentUser(data: UserUpdate['data'], state: Room) {
    return state.users.map((user) => {
      if (user.id !== data.id) return user
      return {
        ...user,
        ...data,
      }
    })
  }

  private async removeSpectatorVote(data: UserUpdate['data']) {
    if (data.state !== 'spectator') return data
    this.getStorageInstance().saveVote(data.id, '')
    data.point = ''
    return data
  }
}
