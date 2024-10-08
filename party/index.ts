import type * as Party from 'partykit/server'
import { type Poll } from './types'

export default class Server implements Party.Server {
  private poll: Poll | undefined

  constructor(readonly room: Party.Room) {}

  async onStart() {
    this.poll = await this.room.storage.get<Poll>('poll')
  }

  async savePoll() {
    if (!this.poll) return
    await this.room.storage.put<Poll>('poll', this.poll)
  }

  async onRequest(req: Party.Request) {
    if (req.method === 'POST') {
      this.poll = await req.json()
      this.savePoll()
    }

    if (!this.poll) {
      return new Response('Not found', { status: 404 })
    }

    return new Response(JSON.stringify(this.poll), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  onConnect() {
    this.room.broadcast(JSON.stringify(this.poll))
  }

  async onMessage(message: string) {
    if (!this.poll) return
    const parsedMessage = JSON.parse(message)

    if (parsedMessage.type === 'slot-machine-state') {
      this.poll.slot.state = parsedMessage.state
      if (this.poll.slot.state === 'waiting') {
        this.poll.users = this.poll.users.map((user) => {
          user.point = ''
          return user
        })
      }
    }

    if (parsedMessage.type === 'user-point') {
      this.poll.users = this.poll.users.map((user) => {
        if (user.id === parsedMessage.userId) {
          user.point = parsedMessage.point
        }
        return user
      })
    }

    this.savePoll()
    this.room.broadcast(JSON.stringify(this.poll))
  }
}

Server satisfies Party.Worker
