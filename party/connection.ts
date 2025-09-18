import { type Connection as PartyKitConn } from 'partykit/server'
import { type Storage } from './storage'
import { type Message } from './message/message'

export class Connection {
  constructor(
    readonly storageService: Storage,
    readonly messageService: Message
  ) {}

  async reconnect(_connection: PartyKitConn) {
    const state = await this.storageService.fetch()
    if (!state) return
    this.storageService.save(state)
    this.messageService.broadcast(state)
  }

  async login(connection: PartyKitConn) {
    const name = new URL(connection.uri).searchParams.get('name')
    const state = await this.storageService.fetch()

    if (!name || !state) return

    const existingUserById = state.users.find(
      (user) => user.id === connection.id
    )
    if (existingUserById) return

    const users = state?.users ?? []
    users.push({
      state: 'waiting',
      name,
      point: '🤫',
      id: connection.id,
    })
    state.users = users
    this.storageService.save(state)
    this.messageService.broadcast(state)
  }

  async logout(connection: PartyKitConn) {
    const state = await this.storageService.fetch()
    if (!state?.users) return
    state.users = state.users.filter((user) => user.id !== connection.id)
    this.storageService.save(state)
    this.messageService.broadcast(state)
  }
}
