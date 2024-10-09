import type * as Party from 'partykit/server'
import {
  type SlotStateUpdate,
  type ParsedMessage,
  type Room,
  type UserUpdate,
  type UserUpdateBulk,
} from './types'

abstract class BaseServer implements Party.Server {
  storage: Room | undefined
  private storageKey = 'room'

  constructor(readonly room: Party.Room) {}

  async onStart() {
    this.storage = await this.room.storage.get<Room>(this.storageKey)
  }

  async saveRoom(storage = this.storage) {
    if (!storage) return
    await this.room.storage.put<Room>(this.storageKey, storage)
  }

  async onRequest(req: Party.Request) {
    if (req.method === 'POST') {
      this.storage = await req.json()
      this.saveRoom()
    }

    if (!this.storage) {
      return new Response('Not found', { status: 404 })
    }

    return new Response(JSON.stringify(this.storage), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

class MessageManager extends BaseServer {
  private mapper: Record<string, (data: any, state: Room) => Room> = {
    'user-update': this.updateUser,
    'user-update-bulk': this.updateUserBulk,
    'slot-machine-state': this.updateSlotState,
  }

  handleMessages(message: string) {
    const parsedMessage = JSON.parse(message) as ParsedMessage
    const fn = this.mapper[parsedMessage.type]
    if (!fn || !this.storage) return
    this.storage = fn(parsedMessage.data, this.storage)
    this.saveRoom()
    this.room.broadcast(JSON.stringify(this.storage))
  }

  private updateSlotState(data: SlotStateUpdate['data'], state: Room) {
    state.slot.shouldSpin = data.shouldSpin
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
      if (user.id !== data.userId) return user
      return {
        ...user,
        ...data,
      }
    })

    return state
  }
}

export default class Server extends MessageManager {
  onConnect(connection: Party.Connection) {
    if (!this.storage) return
    this.room.broadcast(JSON.stringify(this.storage))
  }

  onClose(connection: Party.Connection) {
    if (!this.storage) return
    const url = new URL(connection.uri)
    const userId = url.searchParams.get('userId')
    if (!userId) return
    const user = this.storage.users.find((user) => user.id !== userId)
    if (!user) return

    this.storage.users = this.storage.users.filter((user) => user.id !== userId)
    this.room.broadcast(JSON.stringify(this.storage))
  }

  async onMessage(message: string) {
    this.handleMessages(message)
  }
}

Server satisfies Party.Worker
