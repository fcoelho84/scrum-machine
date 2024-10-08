import { z } from 'zod'

export const CreateRoomSchema = z.object({
  userName: z.string(),
  slotValues: z.array(z.string()).optional(),
})

export const JoinRoomSchema = z.object({
  userName: z.string(),
  roomId: z.string(),
})

export const NewUserSchema = z.object({
  id: z.string(),
  user: z.object({
    name: z.string(),
    id: z.string(),
    point: z.string(),
  }),
})
