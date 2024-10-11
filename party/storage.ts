import type * as Party from 'partykit/server'
import { type Room } from './types'

export class Storage {
  storage: Room | undefined
  private storageKey = 'room'

  constructor(readonly room: Party.Room) {}

  async fetch() {
    return this.room.storage.get<Room>(this.storageKey)
  }

  async save(storage = this.storage) {
    if (!storage) return
    await this.room.storage.put<Room>(this.storageKey, storage)
  }
}
