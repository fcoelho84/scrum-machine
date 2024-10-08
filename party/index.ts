import type * as Party from 'partykit/server'

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) {}

  async onMessage(message: string) {
    this.room.broadcast(message)
  }
}

Server satisfies Party.Worker
