import { type Connection as PartyKitConn } from 'partykit/server'
import { type Storage } from './storage'
import {} from './types'
import { type Message } from './message'

export class Connection {
  constructor(
    readonly storageService: Storage,
    readonly messageService: Message
  ) {}

  async logout(connection: PartyKitConn) {
    const userId = this.findUserId(connection)
    const state = await this.storageService.fetch()
    if (!userId || !state?.users) return
    state.users = state.users.filter((user) => user.id !== userId)
    this.storageService.save(state)
    this.messageService.broadcast(state)
  }

  private findUserId(connection: PartyKitConn) {
    return new URL(connection.uri).searchParams.get('userId')
  }
}
