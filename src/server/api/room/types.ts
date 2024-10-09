import { z } from 'zod'

export const CreateRoomSchema = z.object({
  userName: z.string(),
  slotValues: z.array(z.string()).optional(),
})

export const JoinRoomSchema = z.object({
  userName: z.string(),
  roomId: z.string(),
})

export const OutputSchema = z.object({
  roomId: z.string(),
  userId: z.string(),
})
