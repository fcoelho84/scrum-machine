import type * as Party from 'partykit/server'

import { Storage } from './storage'
import { Message } from './message/message'
import { User } from './user'
import { Api } from './api'

export default class Server implements Party.Server {
  storageService
  messageService
  userService
  apiService
  options: Party.ServerOptions = {
    hibernate: true,
  }

  constructor(readonly room: Party.Room) {
    this.storageService = new Storage(room)
    this.apiService = new Api(this.storageService)
    this.messageService = new Message(this.storageService, room)
    this.userService = new User(this.storageService)
  }

  async onRequest(req: Party.Request) {
    if (req.method === 'POST') return this.apiService.post(req)
    if (req.method === 'PUT') return this.apiService.put(req)
    return this.apiService.get()
  }

  async onReconnect(connection: Party.Connection) {
    const state = await this.storageService.fetch()
    if (!state) return
    this.messageService.sendToConnection(connection, state)
  }

  async onConnect(connection: Party.Connection) {
    const room = await this.storageService.fetch()
    const maxLimit = parseInt(process?.env?.NEXT_PUBLIC_MAX_CONNECTIONS ?? '14')

    if (!room || room?.users.length > maxLimit) return

    const updatedRoom = await this.userService.add(connection)
    this.messageService.broadcast(updatedRoom)
  }

  async onClose(connection: Party.Connection) {
    const updatedRoom = await this.userService.remove(connection)
    this.messageService.broadcast(updatedRoom)
  }

  async onMessage(message: string) {
    await this.messageService.handle(message)
  }
}

Server satisfies Party.Worker
