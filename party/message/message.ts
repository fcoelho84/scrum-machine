import { type Room as PartyKitRoom } from 'partykit/server'
import { type Storage } from '../storage'
import {
  MessageTypes,
  type UserUpdateBulk,
  type ParsedMessage,
  type Room,
} from '../types'
import { pack, unpack } from 'msgpackr'
import { StrategyFactory } from './strategy.factory'

export class Message {
  private factory: StrategyFactory
  constructor(
    readonly storageService: Storage,
    readonly room: PartyKitRoom
  ) {
    this.factory = new StrategyFactory()
  }

  async broadcast(room: Room | undefined) {
    if (!room) return
    this.room.broadcast(pack(room))
  }

  async handle(message: any) {
    const currentState = await this.storageService.fetch()
    const parsedMessage = unpack(message) as ParsedMessage
    const strategy = this.factory.getInstance(parsedMessage.type)
    if (!strategy || !currentState) return
    strategy.setStorageInstance(this.storageService)
    const newState = await strategy.handle(parsedMessage.data, currentState)
    await this.storageService.save(newState)
    this.broadcast(newState)
  }
}
