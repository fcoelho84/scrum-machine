import { MessageTypes } from 'party/types'
import { type Strategy } from './abstract.strategy'
import { UserUpdateStategy } from './message-strategies/user-update'
import { SlotUpdateStrategy } from './message-strategies/slot-update'
import { UserUpdateBulkStategy } from './message-strategies/user-update-bulk'
export class StrategyFactory {
  private strategies: Record<MessageTypes, Strategy> = {
    [MessageTypes.userUpdate]: new UserUpdateStategy(),
    [MessageTypes.userUpdateBulk]: new UserUpdateBulkStategy(),
    [MessageTypes.slotUpdate]: new SlotUpdateStrategy(),
  }

  getInstance(name: MessageTypes) {
    return this.strategies[name]
  }
}
