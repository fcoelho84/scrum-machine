import { type Connection as PartyKitConn } from 'partykit/server'
import { type Storage } from './storage'

export class User {
  constructor(readonly storageService: Storage) {}

  async add(connection: PartyKitConn) {
    const name = new URL(connection.uri).searchParams.get('name')
    const room = await this.storageService.fetch()

    if (!name || !room) return room

    room.users = room?.users ?? []

    const existingUserByName = room.users.find((user) => user.name === name)

    if (!existingUserByName) {
      room.users.push({
        state: 'waiting',
        name,
        point: '🤫',
        id: connection.id,
      })
      await this.storageService.save(room)
    }

    return room
  }

  async remove(connection: PartyKitConn) {
    const room = await this.storageService.fetch()
    if (!room) return room
    room.users = (room?.users ?? []).filter((user) => user.id !== connection.id)
    await this.storageService.save(room)
    return room
  }
}
