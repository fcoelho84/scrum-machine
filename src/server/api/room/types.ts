import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  point: z.number().nullable(),
  isAdmin: z.boolean(),
})

export const CreateRoomSchema = UserSchema.omit({ id: true })

export const FindRoomSchema = z.object({ roomId: z.string() })

export const RoomSchema = z.object({
  id: z.string(),
  slot: z.array(z.string()),
  users: z.array(UserSchema),
})

export type FindRoomQuery = z.infer<typeof FindRoomSchema>

export type CreateRoomQuery = z.infer<typeof CreateRoomSchema>

export type Room = z.infer<typeof RoomSchema>

export type User = z.infer<typeof UserSchema>
