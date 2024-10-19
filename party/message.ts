import { type Room as PartyKitRoom } from 'partykit/server'
import { type Storage } from './storage'
import {
  type UserUpdate,
  type ParsedMessage,
  type UserUpdateBulk,
  type SlotStateUpdate,
  type Room,
} from './types'
import { pack, unpack } from 'msgpackr'

export class Message {
  constructor(
    readonly storageService: Storage,
    readonly room: PartyKitRoom
  ) {}

  private functionMap: Record<string, (data: any, state: Room) => Room> = {
    'user-update': this.updateUser,
    'user-update-bulk': this.updateUserBulk,
    'slot-machine-state': this.updateSlotState,
  }

  async broadcast(room: Room | undefined) {
    if (!room) return
    this.room.broadcast(pack(room))
  }

  async handle(message: any) {
    const state = await this.storageService.fetch()
    const parsedMessage = unpack(message) as ParsedMessage
    const handler = this.getFunction(parsedMessage.type)
    if (!handler || !state) return
    const room = handler(parsedMessage.data, state)
    const newState = await this.shouldRevealVotes(room)

    this.storageService.save(newState)
    this.broadcast(newState)
  }

  private async shouldRevealVotes(state: Room) {
    if (!state.slot.shouldSpin) return state
    const votes = await this.storageService.fetchVotes()
    state.users = state.users.map((user) => {
      user.point = votes[user.id] ?? ''
      return user
    })
    return state
  }

  private getFunction(name: keyof typeof this.functionMap) {
    return this.functionMap[name]
  }

  private updateSlotState(data: SlotStateUpdate['data'], state: Room) {
    state.slot = {
      ...state.slot,
      ...data,
    }

    if (state.slot.shouldSpin) {
      state.users = state.users.map((user) => ({
        ...user,
        state: 'voted',
      }))
    }
    return state
  }

  private updateUserBulk(data: UserUpdateBulk['data'], state: Room) {
    state.users = state.users.map((user) => ({
      ...user,
      ...data,
    }))
    return state
  }

  private updateUser(data: UserUpdate['data'], state: Room) {
    state.users = state.users.map((user) => {
      if (user.id !== data.id) return user
      return {
        ...user,
        ...data,
      }
    })

    return state
  }
}
