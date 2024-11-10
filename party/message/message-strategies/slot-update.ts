import { type Room, type SlotStateUpdate } from 'party/types'
import { Strategy } from '../abstract.strategy'

export class SlotUpdateStrategy extends Strategy {
  handle(data: SlotStateUpdate['data'], state: Room) {
    state.slot = {
      ...state.slot,
      ...data,
    }

    if (!state.slot.shouldSpin) return state

    // state.users = state.users.map((user) => {
    //   if (user.state === 'spectator') return user
    //   return {
    //     ...user,
    //     state: 'voted',
    //   }
    // })

    return this.revealVotes(data, state)
  }

  private async revealVotes(data: SlotStateUpdate['data'], state: Room) {
    const votes = await this.getStorageInstance().fetchVotes()
    state.users = state.users.map((user) => {
      user.point = votes[user.id] ?? ''
      return user
    })
    return state
  }
}
