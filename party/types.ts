import { z } from 'zod'

const SlotSchema = z.object({
  shouldSpin: z.boolean(),
  values: z.array(z.string()),
})

const UserSchma = z.object({
  state: z.enum(['waiting', 'voted', 'idle']),
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

export type UserUpdate = {
  type: 'user-update'
  data: {
    state: 'waiting' | 'voted' | 'idle'
    point: string
    id: string
  }
}

export type UserUpdateBulk = {
  type: 'user-update-bulk'
  data: {
    state: 'waiting' | 'voted' | 'idle'
  }
}

export type SlotStateUpdate = {
  type: 'slot-machine-state'
  data: {
    shouldSpin?: boolean
    values?: string[]
  }
}

export type ParsedMessage = SlotStateUpdate | UserUpdate | UserUpdateBulk
