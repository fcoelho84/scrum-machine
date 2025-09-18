import type * as Party from 'partykit/server'

import { Storage } from './storage'
import { Message } from './message/message'
import { Connection } from './connection'
import { Api } from './api'

export default class Server implements Party.Server {
  storageService
  messageService
  connectionService
  api
  options: Party.ServerOptions = {
    hibernate: true,
  }

  constructor(readonly room: Party.Room) {
    this.storageService = new Storage(room)
    this.api = new Api(this.storageService)
    this.messageService = new Message(this.storageService, room)
    this.connectionService = new Connection(
      this.storageService,
      this.messageService
    )
  }

  async onRequest(req: Party.Request) {
    if (req.method === 'POST') return this.api.post(req)
    if (req.method === 'PUT') return this.api.put(req)
    return this.api.get()
  }

  async onReconnect(connection: Party.Connection) {
    return this.connectionService.login(connection)
  }

  async onConnect(connection: Party.Connection) {
    const room = await this.storageService.fetch()

    if (
      room &&
      room?.users.length >
        parseInt(process?.env?.NEXT_PUBLIC_MAX_CONNECTIONS ?? '14')
    ) {
      return this.connectionService.logout(connection)
    }

    return this.connectionService.login(connection)
  }

  async onClose(connection: Party.Connection) {
    await this.connectionService.logout(connection)
  }

  async onMessage(message: string) {
    await this.messageService.handle(message)
  }
}

Server satisfies Party.Worker
