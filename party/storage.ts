import type * as Party from 'partykit/server'
import { type Room } from './types'

export class Storage {
  private storageKey = 'room'
  private votes = 'votes'

  constructor(readonly room: Party.Room) {}

  async fetch() {
    return this.room.storage.get<Room>(this.storageKey)
  }

  async save(storage: Room) {
    await this.room.storage.put<Room>(this.storageKey, storage)
  }

  async fetchVotes() {
    const votes = await this.room.storage.get<Record<string, string>>(
      this.votes
    )
    if (!votes) return {}
    return votes
  }

  async saveVote(id: string, vote: string) {
    const votes = await this.fetchVotes()
    votes[id] = vote
    await this.room.storage.put(this.votes, votes)
  }
}
