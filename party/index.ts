import type * as Party from 'partykit/server'

import { Storage } from './storage'
import { Message } from './message'
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
    this.messageService = new Message(this.storageService, room)
    this.connectionService = new Connection(
      this.storageService,
      this.messageService
    )
    this.api = new Api(this.storageService)
  }

  async onRequest(req: Party.Request) {
    if (req.method === 'POST') return this.api.post(req)
    return this.api.get()
  }

  async onClose(connection: Party.Connection) {
    await this.connectionService.logout(connection)
  }

  async onMessage(message: string) {
    await this.messageService.handle(message)
  }
}

Server satisfies Party.Worker
