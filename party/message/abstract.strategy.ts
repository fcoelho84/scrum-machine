import { type Storage } from 'party/storage'
import { type Room, type MessageData } from 'party/types'

export abstract class Strategy {
  private instance: Storage | undefined

  public setStorageInstance(instance: Storage) {
    this.instance = instance
  }

  public getStorageInstance() {
    if (!this.instance) {
      throw new Error('Storage not initialized')
    }

    return this.instance
  }

  public abstract handle(data: MessageData, state: Room): Promise<Room> | Room
}
