import { type Request } from 'partykit/server'
import { type Storage } from './storage'
import { type Room } from './types'

export class Api {
  constructor(readonly storageService: Storage) {}

  async post(req: Request) {
    const room = await req.json<Room>()
    this.storageService.save(room)
    return new Response(JSON.stringify(room), { status: 200 })
  }

  async get() {
    const data = await this.storageService.fetch()
    if (!data) {
      return new Response('Not found', { status: 404 })
    }
    return new Response(JSON.stringify(data), { status: 200 })
  }
}
