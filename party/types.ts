import { z } from 'zod'

const SlotSchema = z.object({
  shouldSpin: z.boolean(),
  values: z.array(z.string()),
})

const UserSchma = z.object({
  state: z.enum(['waiting', 'voted', 'idle', 'spectator']),
  name: z.string(),
  id: z.string(),
  point: z.string(),
})

export const RoomSchema = z.object({
  id: z.string(),
  slot: SlotSchema,
  users: z.array(UserSchma),
})

export type Room = z.infer<typeof RoomSchema>

export type RoomUser = z.infer<typeof UserSchma>

export enum MessageTypes {
  userUpdate = 'user-update',
  userUpdateBulk = 'user-update-bulk',
  slotUpdate = 'slot-machine-state',
}

export type UserUpdate = {
  type: MessageTypes.userUpdate
  data: {
    state: 'waiting' | 'voted' | 'idle' | 'spectator'
    point: string
    id: string
  }
}

export type UserUpdateBulk = {
  type: MessageTypes.userUpdateBulk
  data: {
    state: 'waiting' | 'voted' | 'idle'
  }
}

export type SlotStateUpdate = {
  type: MessageTypes.slotUpdate
  data: {
    shouldSpin?: boolean
    values?: string[]
  }
}

export type MessageData =
  | UserUpdate['data']
  | UserUpdateBulk['data']
  | SlotStateUpdate['data']

export type ParsedMessage = {
  type: MessageTypes
  data: MessageData
}
