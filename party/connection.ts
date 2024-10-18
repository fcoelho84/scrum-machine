import { type Connection as PartyKitConn } from 'partykit/server'
import { type Storage } from './storage'
import {} from './types'
import { type Message } from './message'

export class Connection {
  constructor(
    readonly storageService: Storage,
    readonly messageService: Message
  ) {}

  async login(connection: PartyKitConn) {
    const name = new URL(connection.uri).searchParams.get('name')
    const state = await this.storageService.fetch()
    const user = state?.users.find((user) => user.id === connection.id)
    if (!name || !state || user) return
    const users = state?.users ?? []
    users.push({
      state: 'waiting',
      name,
      point: '',
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
